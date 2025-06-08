(async function () {
  const container = document.getElementById('codeBoxesContainer');

  function createCodeBox(name, code) {
    const box = document.createElement('section');
    box.className = 'code-box';
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', `Code snippet titled ${name}`);

    const title = document.createElement('div');
    title.className = 'code-title';
    title.textContent = name;

    const pre = document.createElement('pre');
    pre.textContent = code;

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-button';
    copyBtn.innerText = 'Copy';

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerText = 'Copied!';
        setTimeout(() => (copyBtn.innerText = 'Copy'), 1500);
      });
    });

    box.appendChild(title);
    box.appendChild(pre);
    box.appendChild(copyBtn);
    return box;
  }

  async function loadSnippets() {
    try {
      const res = await fetch('https://raw.githubusercontent.com/Carlotta-gf/Codelabs/main/snippets.json');
      const snippets = await res.json();

      container.innerHTML = '';
      if (!snippets.length) {
        container.innerHTML = '<p>No snippets found.</p>';
        return;
      }

      snippets.forEach(({ name, code }) => {
        const box = createCodeBox(name, code);
        container.appendChild(box);
      });
    } catch (err) {
      console.error(err);
      container.innerHTML = '<p style="color:red;">Failed to load code snippets.</p>';
    }
  }

  loadSnippets();
})();
