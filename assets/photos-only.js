(()=>{'use strict';
const M=window.BA_MOBILE;
if(!M||!M.D)return;
const COPY={
fr:{photo:'Photo',step4b:'Photos demandées par WhatsApp, sans stockage lourd.'},
en:{photo:'Photo',step4b:'Photos are requested through WhatsApp, without heavy storage.'},
es:{photo:'Foto',step4b:'Las fotos se solicitan por WhatsApp, sin almacenamiento pesado.'},
de:{photo:'Foto',step4b:'Fotos werden über WhatsApp angefordert, ohne schweren Speicher.'},
it:{photo:'Foto',step4b:'Le foto sono richieste via WhatsApp, senza archiviazione pesante.'},
nl:{photo:'Foto',step4b:'Foto’s worden via WhatsApp gevraagd, zonder zware opslag.'},
ar:{photo:'صورة',step4b:'تُطلب الصور عبر واتساب دون تخزين ثقيل.'}
};
Object.entries(COPY).forEach(([lang,values])=>Object.assign(M.D[lang],values));
})();
