const dialog = document.querySelector('[data-lightbox-dialog]');
const dialogImage = dialog?.querySelector('img');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!dialog || !dialogImage) return;
    const preview = button.querySelector('img');
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = preview?.alt || 'Expanded research figure';
    dialog.showModal();
  });
});

document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => {
  dialog?.close();
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('[data-copy-citation]')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const citation = document.querySelector('#citation-text')?.textContent?.trim();
  if (!citation) return;

  try {
    await navigator.clipboard.writeText(citation);
    const original = button.textContent;
    button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = original; }, 1800);
  } catch {
    window.getSelection()?.selectAllChildren(document.querySelector('#citation-text'));
  }
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero__video')?.pause();
}
