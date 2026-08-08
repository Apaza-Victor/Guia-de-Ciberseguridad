/**
 * SECTION NAV - Navegación compartida entre secciones
 * Proporciona: navegación prev/next entre secciones
 */

const SECTIONS = [
  { id: '01-introduccion', title: 'Introducción a la Ciberseguridad', icon: 'fa-shield-halved' },
  { id: '02-amenazas', title: 'Amenazas y Vulnerabilidades', icon: 'fa-bug' },
  { id: '03-redes', title: 'Redes y Protocolos', icon: 'fa-network-wired' },
  { id: '04-criptografia', title: 'Criptografía', icon: 'fa-lock' },
  { id: '05-sistemas', title: 'Seguridad SO', icon: 'fa-server' },
  { id: '06-hacking', title: 'Hacking Ético', icon: 'fa-user-secret' },
  { id: '07-seguridad-web', title: 'Seguridad Web', icon: 'fa-globe' },
  { id: '08-forense', title: 'Forense Digital', icon: 'fa-search' },
  { id: '09-normativas', title: 'Normativas', icon: 'fa-gavel' },
  { id: '10-certificaciones', title: 'Certificaciones', icon: 'fa-award' },
];

function getCurrentSectionIndex() {
  const path = window.location.pathname;
  const currentFile = path.split('/').pop().replace('.html', '');
  return SECTIONS.findIndex(s => s.id === currentFile);
}

function getPrevSection() {
  const idx = getCurrentSectionIndex();
  return idx > 0 ? SECTIONS[idx - 1] : null;
}

function getNextSection() {
  const idx = getCurrentSectionIndex();
  return idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;
}

function renderSectionNav(currentId) {
  const idx = SECTIONS.findIndex(s => s.id === currentId);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  let html = '';
  if (prev) {
    html += `<a href="${prev.id}.html" class="section-nav-btn"><i class="fas fa-arrow-left"></i> ${prev.title}</a>`;
  } else {
    html += '<div></div>';
  }
  if (next) {
    html += `<a href="${next.id}.html" class="section-nav-btn">${next.title} <i class="fas fa-arrow-right"></i></a>`;
  }

  nav.innerHTML = html;
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const currentFile = path.split('/').pop().replace('.html', '');

  if (SECTIONS.find(s => s.id === currentFile)) {
    renderSectionNav(currentFile);
  }
});
