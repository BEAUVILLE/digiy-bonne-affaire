(()=>{'use strict';
const M=window.BA_MOBILE;
if(!M||!M.D)return;
const COPY={
fr:{proof:'0 % commission DIGIY · Sénégal & Europe',photo:'Photo',step4b:'Photos demandées par WhatsApp, sans stockage lourd.'},
en:{proof:'0% DIGIY commission · Senegal & Europe',photo:'Photo',step4b:'Photos are requested through WhatsApp, without heavy storage.'},
es:{proof:'0 % de comisión DIGIY · Senegal y Europa',photo:'Foto',step4b:'Las fotos se solicitan por WhatsApp, sin almacenamiento pesado.'},
de:{proof:'0 % DIGIY-Provision · Senegal & Europa',photo:'Foto',step4b:'Fotos werden über WhatsApp angefordert, ohne schweren Speicher.'},
it:{proof:'0% commissione DIGIY · Senegal ed Europa',photo:'Foto',step4b:'Le foto sono richieste via WhatsApp, senza archiviazione pesante.'},
nl:{proof:'0% DIGIY-commissie · Senegal & Europa',photo:'Foto',step4b:'Foto’s worden via WhatsApp gevraagd, zonder zware opslag.'},
ar:{proof:'عمولة DIGIY صفر · السنغال وأوروبا',photo:'صورة',step4b:'تُطلب الصور عبر واتساب دون تخزين ثقيل.'}
};
Object.entries(COPY).forEach(([lang,values])=>Object.assign(M.D[lang],values));
})();
