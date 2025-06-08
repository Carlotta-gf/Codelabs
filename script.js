(function() {
  const STORAGE_KEY = 'sharedCodeSnippets'; // Or your shared backend key
  const container = document.getElementById('codeBoxesContainer');

  function createCodeBox(name, code) {
    const box = document.createElement('section');
    box.className = 'code-box';
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', `Code snippet titled ${name}`);

    // Title (name)
    const title = document.createElement('div');
    title.className = 'code-title';
    title.textContent = name;

    // Code block
    const pre = document.createElement('pre');
    pre.textContent = code;

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-button';
    copyBtn.setAttribute('aria-label', `Copy code snippet titled ${name} to clipboard`);
    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m-4 4h10a2 2 0 002-2V7a2 2 0 00-2-2h-3l-2-2h-3a2 2 0 00-2 2v3" />
    </svg>`;

    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';

    copyBtn.addEventListener('click', () => {
      if (!navigator.clipboard) {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showFeedback(feedback);
        } catch {
          feedback.textContent = 'Failed to copy';
          feedback.classList.add('visible');
          setTimeout(() => feedback.classList.remove('visible'), 2000);
        }
        document.body.removeChild(textArea);
      } else {
        navigator.clipboard.writeText(code).then(() => showFeedback(feedback), () => {
          feedback.textContent = 'Failed to copy';
          feedback.classList.add('visible');
          setTimeout(() => feedback.classList.remove('visible'), 2000);
        });
      }
    });

    function showFeedback(el) {
      el.textContent = 'Copied!';
      el.classList.add('visible');
      setTimeout(() => el.classList.remove('visible'), 2000);
    }

    box.appendChild(copyBtn);
    box.appendChild(feedback);
    box.appendChild(title);
    box.appendChild(pre);
    return box;
  }

  function loadSnippets() {
    const snippets = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    container.innerHTML = '';
    if (snippets.length === 0) {
      container.innerHTML = '<p style="color:var(--color-text-secondary);text-align:center;">No uploaded snippets available.</p>';
      return;
    }
    snippets.forEach(({name, code}) => {
      const box = createCodeBox(name, code);
      container.appendChild(box);
    });
  }

  loadSnippets();
})();
