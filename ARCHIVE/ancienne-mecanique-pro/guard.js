/* =========================
   DIGIY BONNE AFFAIRE — GUARD (GH PAGES SAFE) ✅ V2
   - PUBLIC libre: aucune redirection automatique
   - Mode PUBLIC "NO-SLUG": purge slug + n’injecte jamais slug dans les liens
   - Mode PRO: slug autorisé (URL > session > localStorage)
   - Login: phone + pin -> RPC verify_access_pin_phone (module: "bonne_affaire")
   - Session longue (90 jours) terrain

   Expose:
     DIGIY_GUARD.boot({ login, publicNoSlug, requireAuth })
     DIGIY_GUARD.isAuth()
     DIGIY_GUARD.loginWithPin(phone, pin)
     DIGIY_GUARD.logout(redirect)
     DIGIY_GUARD.getSession()
     DIGIY_GUARD.getSlug()
     DIGIY_GUARD.withSlug(url, {force})
     DIGIY_GUARD.go(url, {force})
     DIGIY_GUARD.purgePublicSlug()
========================= */
(function(){
  "use strict";

  // =============================
  // SUPABASE
  // =============================
  const SUPABASE_URL = "https://wesqmwjjtsefyjnluosj.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc3Ftd2pqdHNlZnlqbmx1b3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzg4ODIsImV4cCI6MjA4MDc1NDg4Mn0.dZfYOc2iL2_wRYL3zExZFsFSBK6AbMeOid2LrIjcTdA";

  // =============================
  // STORAGE KEYS
  // =============================
  const K = {
    SESSION: "DIGIY_BONNE_AFFAIRE_SESSION_V1",
    SLUG: "DIGIY_SLUG",
    PRO_ID: "DIGIY_PRO_ID",
    TITLE: "DIGIY_TITLE",
    PHONE: "DIGIY_PHONE"
  };

  const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 jours
  const now = ()=> Date.now();

  // =============================
  // SAFE localStorage
  // =============================
  function lsGet(k){ try{ return localStorage.getItem(k); }catch(_){ return null; } }
  function lsSet(k,v){ try{ localStorage.setItem(k, String(v ?? "")); }catch(_){ } }
  function lsDel(k){ try{ localStorage.removeItem(k); }catch(_){ } }

  // =============================
  // JSON SAFE
  // =============================
  function safeJsonParse(x){
    try{ return JSON.parse(x); }catch(_){ return null; }
  }

  // =============================
  // URL slug
  // =============================
  function urlSlug(){
    try{
      const s = new URLSearchParams(location.search).get("slug");
      return (s || "").trim();
    }catch(_){
      return "";
    }
  }

  function cleanSlug(s){
    const x = String(s || "").trim();
    if(!x) return "";
    return x
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9\-_]/g,"")
      .replace(/-+/g,"-")
      .replace(/^_+|_+$/g,"");
  }

  // =============================
  // SESSION
  // =============================
  function getSession(){
    try{
      const raw = lsGet(K.SESSION);
      if(!raw) return null;
      const s = safeJsonParse(raw);
      if(!s || !s.expires_at) return null;
      if(now() > s.expires_at) return null;
      return s;
    }catch(_){
      return null;
    }
  }

  function setSession(data){
    const s = {
      ...data,
      created_at: now(),
      expires_at: now() + SESSION_TTL_MS
    };
    try{ localStorage.setItem(K.SESSION, JSON.stringify(s)); }catch(_){}
    return s;
  }

  function clearSession(){
    lsDel(K.SESSION);
  }

  function isAuth(){
    const s = getSession();
    return !!(s && s.owner_id);
  }

  // =============================
  // SUPABASE (singleton)
  // =============================
  function getSb(){
    if(!window.supabase?.createClient) return null;
    if(!window.__digiy_sb__){
      window.__digiy_sb__ = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return window.__digiy_sb__;
  }

  // =============================
  // MODE FLAGS (publicNoSlug)
  // =============================
  const STATE = {
    publicNoSlug: false
  };

  function purgePublicSlug(){
    // ✅ on purge seulement le slug, pas la session
    lsDel(K.SLUG);
  }

  // =============================
  // SLUG source of truth (PRO)
  // =============================
  function safeSessionObj(){
    const s = getSession();
    return (s && typeof s === "object") ? s : null;
  }

  function getSlug(){
    if(STATE.publicNoSlug) return ""; // ✅ PUBLIC: jamais
    const u = cleanSlug(urlSlug());
    if(u) return u;

    const sess = safeSessionObj();
    const ss = cleanSlug(sess?.slug || "");
    if(ss) return ss;

    return cleanSlug(lsGet(K.SLUG) || "");
  }

  function syncSlugFromUrl(){
    if(STATE.publicNoSlug) return null; // ✅ PUBLIC: jamais
    const u = cleanSlug(urlSlug());
    if(!u) return null;
    const cur = cleanSlug(lsGet(K.SLUG) || "");
    if(cur !== u) lsSet(K.SLUG, u);
    return u;
  }

  function withSlug(url, opts){
    // opts.force === false -> n’injecte jamais
    if(opts && opts.force === false) return url;

    // mode PUBLIC no-slug -> n’injecte jamais
    if(STATE.publicNoSlug) return url;

    const s = getSlug();
    try{
      const u = new URL(url, location.href);
      if(s) u.searchParams.set("slug", s);
      return u.toString();
    }catch(_){
      if(!s) return url;
      return url + (url.includes("?") ? "&" : "?") + "slug=" + encodeURIComponent(s);
    }
  }

  function go(url, opts){
    location.replace(withSlug(url, opts));
  }

  // =============================
  // LOGIN (phone + pin -> RPC)
  // =============================
  async function loginWithPin(phone, pin){
    const sb = getSb();
    if(!sb) return { ok:false, error:"Supabase non initialisé (script Supabase manquant ou bloqué)" };

    phone = String(phone || "").trim();
    pin   = String(pin || "").trim();

    if(!phone || !pin){
      return { ok:false, error:"Téléphone et PIN requis" };
    }

    const payload = {
      p_phone: phone,
      p_pin: pin,
      p_module: "bonne_affaire"
    };

    const { data, error } = await sb.rpc("verify_access_pin_phone", payload);
    if(error) return { ok:false, error: error.message };

    const res = (typeof data === "string") ? safeJsonParse(data) : data;
    if(!res?.ok || !res?.owner_id){
      return { ok:false, error: res?.reason || res?.error || "Accès refusé" };
    }

    const session = setSession({
      ok: true,
      module: "bonne_affaire",
      owner_id: res.owner_id,
      slug: cleanSlug(res.slug || ""),
      title: res.title || "",
      phone: res.phone || phone
    });

    // mirrors cross-modules (PRO)
    lsSet(K.PRO_ID, session.owner_id);
    if(session.slug)  lsSet(K.SLUG, session.slug);
    if(session.title) lsSet(K.TITLE, session.title);
    if(session.phone) lsSet(K.PHONE, session.phone);

    return { ok:true, session };
  }

  // =============================
  // BOOT
  // =============================
  async function boot(options){
    const loginUrl = options?.login || "./pin.html";

    // ✅ PUBLIC NO-SLUG : purge et verrouille le mode
    if(options?.publicNoSlug){
      STATE.publicNoSlug = true;
      purgePublicSlug();
    }else{
      STATE.publicNoSlug = false;
      syncSlugFromUrl();
    }

    const s = getSession();

    // ✅ si connecté, on aligne le slug PRO (sauf publicNoSlug)
    if(s && s.owner_id && !STATE.publicNoSlug){
      const urlS = cleanSlug(urlSlug());
      const finalSlug = urlS || cleanSlug(s.slug) || cleanSlug(lsGet(K.SLUG) || "");
      if(finalSlug && finalSlug !== cleanSlug(s.slug)){
        s.slug = finalSlug;
        setSession(s);
        lsSet(K.SLUG, finalSlug);
      }
      return { ok:true, session:s, slug: finalSlug || "" };
    }

    // ✅ requireAuth: si pas connecté, on propose le login (mais on ne force pas ici)
    if(options?.requireAuth && !(s && s.owner_id)){
      return { ok:false, requireAuth:true, login: loginUrl, slug: getSlug() };
    }

    // Public
    return { ok:false, public:true, login: loginUrl, slug: getSlug() };
  }

  // =============================
  // LOGOUT
  // =============================
  function logout(redirect){
    clearSession();
    // optionnel: purge slug aussi
    purgePublicSlug();
    location.replace(redirect || "./pin.html");
  }

  // =============================
  // EXPORT
  // =============================
  window.DIGIY_GUARD = window.DIGIY_GUARD || {};
  window.DIGIY_GUARD.getSb = getSb;
  window.DIGIY_GUARD.getSession = getSession;
  window.DIGIY_GUARD.isAuth = isAuth;
  window.DIGIY_GUARD.loginWithPin = loginWithPin;
  window.DIGIY_GUARD.boot = boot;
  window.DIGIY_GUARD.logout = logout;
  window.DIGIY_GUARD.getSlug = getSlug;
  window.DIGIY_GUARD.withSlug = withSlug;
  window.DIGIY_GUARD.go = go;
  window.DIGIY_GUARD.syncSlugFromUrl = syncSlugFromUrl;
  window.DIGIY_GUARD.purgePublicSlug = purgePublicSlug;

  // init (ne fait rien si publicNoSlug pas activé)
  syncSlugFromUrl();
})();
