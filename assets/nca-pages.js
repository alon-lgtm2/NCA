// NCA – shared language handling for standalone pages.
// Each page defines window.T = { en:{...}, he:{...}, nl:{...} } before loading this file.
// Markup: data-t="key" (text), data-th="key" (HTML), data-tp="key" (placeholder),
// a[data-keep-lang] links get ?lang=<current> appended.
(function () {
  const LANGS = ['en', 'he', 'nl'];
  const DIR = { en: 'ltr', he: 'rtl', nl: 'ltr' };

  function store(k, v) { try { v === undefined ? (v = localStorage.getItem(k)) : localStorage.setItem(k, v); } catch (e) { v = null; } return v; }

  function initialLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    const saved = store('nca_lang');
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || '').slice(0, 2);
    return nav === 'he' || nav === 'iw' ? 'he' : nav === 'nl' ? 'nl' : 'en';
  }

  function apply(l) {
    const t = window.T[l];
    const root = document.documentElement;
    root.lang = l; root.dir = DIR[l];
    document.querySelectorAll('[data-t]').forEach(el => { const v = t[el.dataset.t]; if (v !== undefined) el.textContent = v; });
    document.querySelectorAll('[data-th]').forEach(el => { const v = t[el.dataset.th]; if (v !== undefined) el.innerHTML = v; });
    document.querySelectorAll('[data-tp]').forEach(el => { const v = t[el.dataset.tp]; if (v !== undefined) el.placeholder = v; });
    if (t['page.title']) document.title = t['page.title'];
    document.querySelectorAll('a[data-keep-lang]').forEach(a => {
      const u = new URL(a.getAttribute('href'), location.href);
      u.searchParams.set('lang', l);
      a.href = u.pathname + u.search + u.hash;
    });
    document.querySelectorAll('.lb').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
    const u = new URL(location.href); u.searchParams.set('lang', l);
    history.replaceState(null, '', u.pathname + u.search + u.hash);
    store('nca_lang', l);
    window.NCA.lang = l;
    document.dispatchEvent(new CustomEvent('nca:lang', { detail: l }));
  }

  window.NCA = { lang: 'en', setLang: apply, t: k => (window.T[window.NCA.lang] || {})[k] || k };
  document.querySelectorAll('.lb').forEach(b => b.addEventListener('click', () => apply(b.dataset.lang)));
  apply(initialLang());
})();
