(()=>{'use strict';
const M=window.BA_MOBILE;
if(!M||!M.D)return;
const COPY={
fr:{proof:'0 % commission DIGIY · Sénégal & Europe',photo:'Photo',step4b:'Photos demandées par WhatsApp, sans stockage lourd.',commercialTitle:'Vous payez la publication. Vous gardez la vente.',commercialText:'Publier sur DIGIY BONNE AFFAIRE, c’est choisir une visibilité claire, classée et sérieuse. DIGIY ne prend aucune commission sur votre vente.'},
en:{proof:'0% DIGIY commission · Senegal & Europe',photo:'Photo',step4b:'Photos are requested through WhatsApp, without heavy storage.',commercialTitle:'You pay for the listing. You keep the sale.',commercialText:'Publishing on DIGIY BONNE AFFAIRE means choosing clear, organised and serious visibility. DIGIY takes no commission on your sale.'},
es:{proof:'0 % de comisión DIGIY · Senegal y Europa',photo:'Foto',step4b:'Las fotos se solicitan por WhatsApp, sin almacenamiento pesado.',commercialTitle:'Pagas la publicación. Conservas la venta.',commercialText:'Publicar en DIGIY BONNE AFFAIRE significa elegir una visibilidad clara, clasificada y seria. DIGIY no cobra comisión sobre tu venta.'},
de:{proof:'0 % DIGIY-Provision · Senegal & Europa',photo:'Foto',step4b:'Fotos werden über WhatsApp angefordert, ohne schweren Speicher.',commercialTitle:'Sie zahlen für die Anzeige. Der Verkauf bleibt bei Ihnen.',commercialText:'Eine Veröffentlichung auf DIGIY BONNE AFFAIRE bietet klare, geordnete und seriöse Sichtbarkeit. DIGIY erhält keine Provision auf Ihren Verkauf.'},
it:{proof:'0% commissione DIGIY · Senegal ed Europa',photo:'Foto',step4b:'Le foto sono richieste via WhatsApp, senza archiviazione pesante.',commercialTitle:'Paghi la pubblicazione. La vendita resta tua.',commercialText:'Pubblicare su DIGIY BONNE AFFAIRE significa scegliere una visibilità chiara, classificata e seria. DIGIY non prende commissioni sulla vendita.'},
nl:{proof:'0% DIGIY-commissie · Senegal & Europa',photo:'Foto',step4b:'Foto’s worden via WhatsApp gevraagd, zonder zware opslag.',commercialTitle:'Je betaalt voor de advertentie. De verkoop blijft van jou.',commercialText:'Publiceren op DIGIY BONNE AFFAIRE betekent kiezen voor duidelijke, geordende en serieuze zichtbaarheid. DIGIY neemt geen commissie op je verkoop.'},
ar:{proof:'عمولة DIGIY صفر · السنغال وأوروبا',photo:'صورة',step4b:'تُطلب الصور عبر واتساب دون تخزين ثقيل.',commercialTitle:'تدفع مقابل نشر الإعلان. وتحتفظ بكامل قيمة البيع.',commercialText:'النشر على DIGIY BONNE AFFAIRE يمنح إعلانك ظهورًا واضحًا ومنظمًا وجادًا. لا تأخذ DIGIY أي عمولة على البيع.'}
};
Object.entries(COPY).forEach(([lang,values])=>Object.assign(M.D[lang],values));
})();
