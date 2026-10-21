document.addEventListener('click', async function(event) {
  const button = event.target.closest('[data-share-coach]');
  if (!button) return;
  const status = document.getElementById('coach-share-status');
  const url = new URL('./coach-ousmane-dione.html', location.href).href;
  const data = {title: 'Coach Ousmane Dione · DIGIYLYFE', text: 'Coaching sportif et services web pour téléphone · Saly', url};
  try {
    if (navigator.share) { await navigator.share(data); return; }
  } catch (error) { if (error.name === 'AbortError') return; }
  try {
    if (navigator.clipboard) { await navigator.clipboard.writeText(url); status.textContent = 'Lien copié : ' + url; return; }
  } catch (error) {}
  status.replaceChildren(document.createTextNode('Lien à copier : '));
  const link = document.createElement('a'); link.href = url; link.textContent = url; status.appendChild(link);
});
