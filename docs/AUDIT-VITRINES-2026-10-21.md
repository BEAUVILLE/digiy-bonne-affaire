# Audit vitrines — 21 octobre 2026

## Destination QR demandée : carte partageable

Le fondateur précise que le QR doit ouvrir sa carte de visite. La version active `coach-ousmane-dione-qr-carte.png` encode donc `https://bonne-affaire.digiylyfe.com/coach-ousmane-dione.html`, au lieu de la vCard décrite dans la mise à jour précédente. Le décodage exact de cette URL est vérifié à 941, 630, 440 et 390 pixels de largeur. Seule la zone QR est modifiée. La fiche possède le bouton Partager avec partage natif, copie du lien ou lien visible en secours. Le rendu public après fusion et le partage iOS réel restent à contrôler.


## Mise à jour QR — 21 octobre 2026

Le fondateur a demandé explicitement de corriger le QR après fusion des premières PR. Le nouveau fichier `assets/coach-ousmane-dione-qr-verifie.png` remplace uniquement la zone QR (x=646..879, y=1198..1419). Le reste des pixels est identique à l’original, conservé dans le dépôt.

Décodage ZXing réussi sur l’affiche entière aux largeurs 941, 630, 440 et 390 px. Contenu vCard 3.0 : Ousmane Dione, +221771594373, oussze92@gmail.com (adresse fournie par le fondateur). Le QR permet l’enregistrement du contact, sans URL ni redirection. Cela résout le blocage de décodage ci-dessous, qui décrit l’ancien PNG. Aucun test caméra iPhone ni déploiement public n’est revendiqué. La divergence de l’adresse imprimée reste à confirmer.

SHA-256 corrigé : `16204c0a78fa602e7ec44288b7a9f6a80b2245c8561ec37b58387253b1cdff59`.

## Audit initial — conservé pour traçabilité

Base `main` inspectée : `cebf231c16d68e8b0c9a3245c09b5dec7f2ab86c`. PR historique #11 confirmée fusionnée par GitHub. Sa description indiquait explicitement que le PNG n'était pas hébergé dans le dépôt et que QR/PWA restaient à contrôler.

## Causes démontrées dans le code

- `index.html` plaçait `.join` (publier) dans le header, puis vision, édition, doctrine, exemple et partage avant `.ba-real-network`.
- `.ba-pricing` précédait les annonces actives. Les cartes professionnelles avaient un recadrage `object-fit:cover` et une hauteur plafonnée (hors Salon).
- Correction : professionnels juste après la présentation, annonces actives ensuite, tarifs puis demandes. Les 19 articles existants sont conservés sans modification de leur texte ni de leurs contacts.

- L'accueil et la fiche Coach utilisaient `drive.google.com/thumbnail`, donc une ressource externe dépendant de Google Drive. Le constat prouve la dépendance, pas un refus de chargement dans le navigateur du fondateur.

## Affiche originale et QR : blocage avant fusion

PNG original récupéré : « Flyer Coach Ousmane Dione – Sport et services web.png ».
Dimensions : 941 × 1672, format vertical proche de 9:16. Copié sans aucune modification dans `assets/coach-ousmane-dione-original.png`.
SHA-256 : `fa9ba067966ade4abd511e178232be3ba3751773de02bf9bc4036512af5f5cc1`.

Le décodage ZXing de l'image complète, du cadrage QR, puis de variantes de lecture (agrandissement, marge blanche et seuil) n'a livré aucun contenu QR valide. **Destination inconnue : ne pas annoncer un QR fonctionnel.** Aucun nouveau QR ni visuel recréé. Il faut un original avec QR lisible ou l'accord explicite du fondateur pour corriger uniquement ce QR, avec une destination confirmée.

L'adresse imprimée paraît être `ousze92@gmail.com`, tandis que la mission donne `oussze92@gmail.com` : le lien e-mail utilise exactement l'adresse demandée par le fondateur. Le PNG reste intact ; confirmer cette différence avant diffusion.

## Hébergement, domaine et cache

- `CNAME` correspond au domaine demandé : `bonne-affaire.digiylyfe.com`.
- Aucun service worker, manifeste PWA ou appel `serviceWorker`/`caches` trouvé dans les fichiers HTML/JS de ces deux dépôts. Cela ne permet pas d'exclure un ancien worker déjà installé sur un appareil.
- Les appels GitHub disponibles n'ont retourné ni workflow run ni statut pour les têtes inspectées. **Ce n'est pas une preuve de déploiement réussi ni d'absence de déploiement.**
- La configuration authentifiée GitHub Pages (branche, dossier, dernier build) n'a pas pu être lue avec les capacités disponibles. La requête Pages non authentifiée retourne 404 ; ce 404 ne prouve pas une mauvaise configuration.
- Accès HTTPS aux deux domaines, en lecture HTTP puis navigateur Chrome distant : page « Site Unavailable / Unable to access this site ». Impossible d'établir si l'origine ou le chemin réseau de cet environnement est responsable. Aucun diagnostic DNS/cache inventé ; aucune configuration modifiée.
- La comparaison des octets publics et de `main` est donc **non concluante** : la page reçue est une page d'erreur, pas le HTML de la vitrine.

## Vérifications effectuées

- PNG local identique octet pour octet à l'original, dans les deux dépôts.
- Contrôle structurel HTML : ordre des sections, absence de doublons d'identifiants, conservation du texte de tous les articles, chemins locaux Coach, liens `tel:+221771594373` et `https://wa.me/221771594373`, présence du bouton Partager.
- Syntaxe de tous les scripts inline des pages modifiées vérifiée avec `node --check`. `git diff --check` réussi.
- `node --test tests/coach-share.test.cjs` : 5 scénarios réussis (partage natif, copie, refus du partage, refus du presse-papiers, annulation volontaire). Ces tests vérifient le comportement logiciel, **pas la feuille de partage iOS réelle**.
- Les images professionnelles sont configurées en hauteur automatique, sans recadrage. La lisibilité/absence de débordement doit encore être observée dans un navigateur réel.

## Contrôles NON effectués / requis avant validation finale

- Rendu public et chargement réel de toutes les images.
- Safari iPhone, Chrome iPhone, PWA installée, navigation privée, rafraîchissement après déploiement.
- Lancement réel de WhatsApp et du composeur téléphone, partage natif sur iOS.
- QR valide et destination confirmée.
- Comparaison finale du contenu servi avec le commit fusionné et preuve de déploiement GitHub Pages.

L'aperçu local n'était pas accessible au navigateur distant (connexion localhost refusée). Aucune capture de rendu ni test iPhone simulé ne sont présentés comme preuves.

## Suite de validation

1. Résoudre le QR et confirmer l'adresse imprimée.
2. Faire contrôler les changements par le fondateur ; aucune fusion automatique.
3. Après fusion explicitement autorisée, vérifier le déploiement Pages puis les deux URLs publiques, les images, l'ordre et les contacts sur iPhone/PWA.

La mission ne peut pas être déclarée terminée tant que ces contrôles restent ouverts.
