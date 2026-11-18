const coachShareLabels = {
  "fr": [
    "Lien copié",
    "Lien à copier"
  ],
  "en": [
    "Link copied",
    "Copy this link"
  ],
  "es": [
    "Enlace copiado",
    "Copia este enlace"
  ],
  "pt": [
    "Ligação copiada",
    "Copie esta ligação"
  ],
  "it": [
    "Link copiato",
    "Copia questo link"
  ],
  "de": [
    "Link kopiert",
    "Diesen Link kopieren"
  ],
  "nl": [
    "Link gekopieerd",
    "Kopieer deze link"
  ],
  "ar": [
    "تم نسخ الرابط",
    "انسخ هذا الرابط"
  ],
  "wo": [
    "Duppi nañu lëkkalekaay bi",
    "Duppil lëkkalekaay bii"
  ],
  "zh": [
    "链接已复制",
    "复制此链接"
  ]
};

document.addEventListener('click', async function(event) {
  const button = event.target.closest('[data-share-coach]');
  if (!button) return;
  const status = document.getElementById('coach-share-status');
  const requested = document.documentElement.lang;
  const lang = Object.hasOwn(coachShareLabels, requested) ? requested : 'fr';
  const [copied, copyLink] = coachShareLabels[lang];
  const card = new URL('./coach-ousmane-dione.html', location.href);
  card.searchParams.set('lang', lang);
  const url = card.href;
  const text = document.getElementById('coach-share-description').textContent.trim();
  const data = {title: 'Coach Ousmane Dione · DIGIYLYFE', text, url};
  try {
    if (navigator.share) { await navigator.share(data); return; }
  } catch (error) { if (error.name === 'AbortError') return; }
  try {
    if (navigator.clipboard) { await navigator.clipboard.writeText(url); status.textContent = copied + ' : ' + url; return; }
  } catch (error) {}
  status.replaceChildren(document.createTextNode(copyLink + ' : '));
  const link = document.createElement('a'); link.href = url; link.textContent = url; status.appendChild(link);
});
