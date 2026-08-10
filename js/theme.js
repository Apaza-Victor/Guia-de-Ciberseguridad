/**
 * ============================================
 * THEME.JS - GUIA DE CYBERSEGURIDAD
 * Efectos 3D, Animaciones e Interactividad
 * ============================================
 */

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  initThemeToggle();
  initProgressBar();
  initNavbar();
  init3DBackground();
  initHero3D();
  initScrollAnimations();
  initTabs();
  initFAQ();
  initSkillBars();
  initTypingEffect();
  // initCardTilt(); // Disabled - cards are now static for better readability
  initSectionNav();
  initParallax();
  initMobileMenu();
  initScrollTop();
  initDropdownBehavior();
});

// ============================================
// MENÚ MÓVIL (hamburguesa) - control total
// ============================================
function initMobileMenu() {
  const toggler = document.querySelector('.navbar-toggler');
  const collapse = document.querySelector('.navbar-collapse');
  if (!toggler || !collapse) return;

  // Desactiva Bootstrap: el menú se controla 100% manual (evita doble toggle)
  toggler.removeAttribute('data-bs-toggle');
  toggler.removeAttribute('data-bs-target');
  if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
    const inst = bootstrap.Collapse.getInstance(collapse);
    if (inst) inst.dispose();
  }

  const openMenu = () => {
    collapse.classList.add('show');
    toggler.classList.add('toggler-open');
    toggler.setAttribute('aria-expanded', 'true');
    toggler.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    collapse.classList.remove('show');
    toggler.classList.remove('toggler-open');
    toggler.setAttribute('aria-expanded', 'false');
    toggler.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');

    // Cerrar también el submenú de Secciones si estaba abierto
    collapse.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      const toggle = menu.closest('.nav-item.dropdown')?.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  };

  // Control manual: evita que Bootstrap (data-api) interfiera con el toggle
  toggler.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (collapse.classList.contains('show')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar al hacer clic fuera del header
  document.addEventListener('click', (e) => {
    if (collapse.classList.contains('show') && !e.target.closest('.navbar-cyber')) {
      closeMenu();
    }
  });

  // Cerrar al navegar (enlaces y elementos de Secciones, excepto el toggle del dropdown)
  collapse.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('dropdown-toggle')) return;
      closeMenu();
    });
  });

  // Al volver a desktop se restablece el menú
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
  });
}

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// DROPDOWN SECCIONES (hover + clic, cierre automático)
// ============================================
function initDropdownBehavior() {
  document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    const menu = item.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    // Clic: abre / cierra el menú
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menu.classList.contains('show');
      if (isOpen) {
        menu.classList.remove('show');
        item.classList.add('force-closed'); // evita que el hover lo mantenga abierto
      } else {
        item.classList.remove('force-closed');
        menu.classList.add('show');
      }
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Al salir el mouse: cerrar automáticamente
    item.addEventListener('mouseleave', () => {
      menu.classList.remove('show');
      item.classList.remove('force-closed');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Al volver a entrar: quitar el bloqueo de cierre por clic
    item.addEventListener('mouseenter', () => {
      item.classList.remove('force-closed');
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item.dropdown').forEach(item => {
      if (!item.contains(e.target)) {
        const menu = item.querySelector('.dropdown-menu');
        const toggle = item.querySelector('.dropdown-toggle');
        if (menu) menu.classList.remove('show');
        item.classList.remove('force-closed');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ============================================
// ACTUALIZACIÓN AUTOMÁTICA DEL AÑO
// ============================================
function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('[data-year]');
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
  // Also update any element with class 'current-year'
  const yearClassElements = document.querySelectorAll('.current-year');
  yearClassElements.forEach(el => {
    el.textContent = currentYear;
  });
}

// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleUI(savedTheme);

  toggleBtn.addEventListener('click', cycleTheme);
}

function cycleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleUI(newTheme);
}

function updateToggleUI(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  });
}

// ============================================
// BARRA DE PROGRESO DE LECTURA
// ============================================
function initProgressBar() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar-cyber');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active nav link based on scroll
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// FONDO 3D CON THREE.JS
// ============================================
function init3DBackground() {
  const container = document.querySelector('.bg-3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 1500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;

    // Cyber colors: cyan, purple, white
    const colorChoice = Math.random();
    if (colorChoice < 0.4) {
      colors[i] = 0; colors[i + 1] = 0.94; colors[i + 2] = 1; // Cyan
    } else if (colorChoice < 0.7) {
      colors[i] = 0.48; colors[i + 1] = 0.18; colors[i + 2] = 0.97; // Purple
    } else {
      colors[i] = 1; colors[i + 1] = 1; colors[i + 2] = 1; // White
    }
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Wireframe geometry
  const wireGeo = new THREE.IcosahedronGeometry(2, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireMesh);

  // Second wireframe
  const wireGeo2 = new THREE.OctahedronGeometry(1.5, 0);
  const wireMat2 = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
  });
  const wireMesh2 = new THREE.Mesh(wireGeo2, wireMat2);
  scene.add(wireMesh2);

  camera.position.z = 5;

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    wireMesh.rotation.x += 0.003;
    wireMesh.rotation.y += 0.005;

    wireMesh2.rotation.x -= 0.004;
    wireMesh2.rotation.z += 0.003;

    // Mouse influence
    particlesMesh.rotation.y += mouseX * 0.001;
    particlesMesh.rotation.x += mouseY * 0.001;

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================
// HERO 3D ANIMATION (sección específica)
// ============================================
function initHero3D() {
  const container = document.querySelector('.hero-3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Shield shape
  const shieldGroup = new THREE.Group();

  // Shield body
  const shieldShape = new THREE.Shape();
  shieldShape.moveTo(0, 2);
  shieldShape.quadraticCurveTo(2, 2, 2, 0.5);
  shieldShape.quadraticCurveTo(2, -1.5, 0, -2.5);
  shieldShape.quadraticCurveTo(-2, -1.5, -2, 0.5);
  shieldShape.quadraticCurveTo(-2, 2, 0, 2);

  const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 };
  const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
  const shieldMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  });
  const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
  shieldGroup.add(shieldMesh);

  // Orbiting rings
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.RingGeometry(3 + i * 0.8, 3.05 + i * 0.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: i === 0 ? 0x00f0ff : i === 1 ? 0x7b2ff7 : 0xff2e63,
      transparent: true,
      opacity: 0.3 - i * 0.08,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (i * 0.3);
    ring.rotation.y = i * 0.5;
    shieldGroup.add(ring);
  }

  // Lock icon dots (simplified)
  for (let i = 0; i < 20; i++) {
    const dotGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    const angle = (i / 20) * Math.PI * 2;
    const radius = 4 + Math.random() * 0.5;
    dot.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
    shieldGroup.add(dot);
  }

  scene.add(shieldGroup);
  camera.position.z = 6;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / container.clientWidth) * 2 - 1;
    mouseY = -(e.clientY / container.clientHeight) * 2 + 1;
  });

  function animateHero() {
    requestAnimationFrame(animateHero);

    shieldGroup.rotation.y += 0.005;
    shieldGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;

    shieldGroup.children.forEach((child, i) => {
      if (i > 0 && i < 4) {
        child.rotation.z += 0.002 * (i + 1);
      }
    });

    renderer.render(scene, camera);
  }

  animateHero();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// ============================================
// SCROLL ANIMATIONS (AOS-like)
// ============================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('animate-fade-in-up');
          el.style.opacity = '1';
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// TABS FUNCTIONALITY
// ============================================
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = container.querySelector(`[data-content="${target}"]`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width || '0%';
        setTimeout(() => {
          fill.style.width = width;
        }, 300);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => observer.observe(fill));
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
  const elements = document.querySelectorAll('[data-typing]');

  elements.forEach(el => {
    const text = el.dataset.typing;
    el.textContent = '';
    let i = 0;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const type = () => {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 40);
          }
        };
        type();
        observer.unobserve(el);
      }
    });

    observer.observe(el);
  });
}

// ============================================
// CARD 3D TILT EFFECT (DISABLED)
// ============================================
// Card tilt effect has been disabled to improve readability
// Cards are now stable and don't move on hover
function initCardTilt() {
  // Tilt effect disabled - cards are now static for better readability
  // This prevents the distracting movement that made text hard to read
}

// ============================================
// SECTION NAVIGATION
// ============================================
function initSectionNav() {
  const sections = document.querySelectorAll('.section');
  const dotsContainer = document.querySelector('.toc-sidebar');

  if (!dotsContainer || sections.length === 0) return;

  // Create dots
  sections.forEach((section, i) => {
    const dot = document.createElement('div');
    dot.className = 'toc-dot';
    dot.innerHTML = `<span class="toc-label">${section.dataset.name || 'Section ' + (i + 1)}</span>`;
    dot.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  // Update active dot on scroll
  window.addEventListener('scroll', () => {
    const dots = dotsContainer.querySelectorAll('.toc-dot');
    let current = 0;

    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) current = i;
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -(window.scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ============================================
// UTILITY: Smooth scroll to anchor
// ============================================
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    const href = link.getAttribute('href');
    if (!href || href === '#') return; // Skip empty or bare # links (dropdown toggles etc)
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// ============================================
// UTILITY: Counter animation
// ============================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Initialize counters when visible
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  });
  counters.forEach(counter => observer.observe(counter));
});

// ============================================
// UTILITY: Copy code to clipboard
// ============================================
function copyCode(button) {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').textContent;

  navigator.clipboard.writeText(code).then(() => {
    button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
  });
}

// ============================================
// UTILITY: Expandable images
// ============================================
function initImageZoom() {
  const images = document.querySelectorAll('.zoomable');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 3000; display: flex;
        align-items: center; justify-content: center; cursor: zoom-out;
      `;
      const cloned = img.cloneNode(true);
      cloned.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
      overlay.appendChild(cloned);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
}

document.addEventListener('DOMContentLoaded', initImageZoom);



// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const SEARCH_DATA = [
  { title: 'Introducción a la Ciberseguridad', section: 'Sección 01', url: 'secciones/01-introduccion.html', icon: 'fa-shield-halved', keywords: 'fundamentos historia cia principios dominios' },
  { title: 'Amenazas y Vulnerabilidades', section: 'Sección 02', url: 'secciones/02-amenazas.html', icon: 'fa-bug', keywords: 'malware virus ransomware phishing exploit' },
  { title: 'Redes y Protocolos', section: 'Sección 03', url: 'secciones/03-redes.html', icon: 'fa-network-wired', keywords: 'osi tcp ip firewalls ids ips vpn segmentacion' },
  { title: 'Criptografía', section: 'Sección 04', url: 'secciones/04-criptografia.html', icon: 'fa-lock', keywords: 'cifrado simetrico asimetrico hash pki tls ssl' },
  { title: 'Seguridad SO', section: 'Sección 05', url: 'secciones/05-sistemas.html', icon: 'fa-server', keywords: 'hardening permisos logs auditoria selinux windows linux' },
  { title: 'Hacking Ético', section: 'Sección 06', url: 'secciones/06-hacking.html', icon: 'fa-user-secret', keywords: 'pentesting reconocimiento escaneo explotacion metasploit' },
  { title: 'Seguridad Web', section: 'Sección 07', url: 'secciones/07-seguridad-web.html', icon: 'fa-globe', keywords: 'owasp xss sql injection csrf apis autenticacion' },
  { title: 'Forense Digital', section: 'Sección 08', url: 'secciones/08-forense.html', icon: 'fa-search', keywords: 'analisis malware cadena custodia investigacion incidentes' },
  { title: 'Normativas', section: 'Sección 09', url: 'secciones/09-normativas.html', icon: 'fa-gavel', keywords: 'iso 27001 gdpr pci dss compliance riesgos auditoria' },
  { title: 'Certificaciones', section: 'Sección 10', url: 'secciones/10-certificaciones.html', icon: 'fa-award', keywords: 'ceh oscp cissp comptia security carrera aprendizaje' },
  { title: 'Herramientas del Arsenal', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-tools', keywords: 'kali wireshark metasploit nmap burp suite john nessus zap' },
  { title: 'Comandos Esenciales', section: 'Comandos', url: 'comandos.html', icon: 'fa-terminal', keywords: 'nmap linux hashing red wifi criptografia metasploit web' },
  { title: 'Recursos y Enlaces', section: 'Recursos', url: 'recursos.html', icon: 'fa-link', keywords: 'hackthebox tryhackme vulnhub overthewire picoctf virustotal' },
  { title: 'Kali Linux', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-terminal', keywords: 'distribucion pentesting herramientas seguridad' },
  { title: 'Wireshark', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-wifi', keywords: 'analisis protocolos red captura trafico' },
  { title: 'Metasploit', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-bug', keywords: 'framework exploits penetracion testing' },
  { title: 'Nmap', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-network-wired', keywords: 'escaneo redes auditoria puertos servicios' },
  { title: 'Burp Suite', section: 'Herramientas', url: 'herramientas.html', icon: 'fa-lock', keywords: 'testing seguridad web proxy scanner' },
  { title: 'OWASP Top 10', section: 'Sección 07', url: 'secciones/07-seguridad-web.html', icon: 'fa-globe', keywords: 'vulnerabilidades web inyeccion broken authentication' },
  { title: 'Modelo OSI', section: 'Sección 03', url: 'secciones/03-redes.html', icon: 'fa-network-wired', keywords: 'capas protocolos red comunicacion' },
  { title: 'Principios CIA', section: 'Sección 01', url: 'secciones/01-introduccion.html', icon: 'fa-shield-halved', keywords: 'confidencialidad integridad disponibilidad seguridad' },
  { title: 'Fases del Pentesting', section: 'Sección 06', url: 'secciones/06-hacking.html', icon: 'fa-user-secret', keywords: 'reconocimiento escaneo explotacion post-explotacion informe' },
  { title: 'CompTIA Security+', section: 'Sección 10', url: 'secciones/10-certificaciones.html', icon: 'fa-award', keywords: 'certificacion basica principiante seguridad' },
  { title: 'OSCP', section: 'Sección 10', url: 'secciones/10-certificaciones.html', icon: 'fa-award', keywords: 'certificacion pentesting ofensiva avanzada' },
  { title: 'CISSP', section: 'Sección 10', url: 'secciones/10-certificaciones.html', icon: 'fa-award', keywords: 'certificacion gestion seguridad senior experto' },
  { title: 'Ransomware', section: 'Sección 02', url: 'secciones/02-amenazas.html', icon: 'fa-bug', keywords: 'malware cifrado datos secuestro bitcoin' },
  { title: 'SQL Injection', section: 'Sección 07', url: 'secciones/07-seguridad-web.html', icon: 'fa-globe', keywords: 'inyeccion sql base datos vulnerabilidad web' },
  { title: 'XSS', section: 'Sección 07', url: 'secciones/07-seguridad-web.html', icon: 'fa-globe', keywords: 'cross-site scripting javascript inyeccion' },
  { title: 'Zero Trust', section: 'Sección 01', url: 'secciones/01-introduccion.html', icon: 'fa-shield-halved', keywords: 'arquitectura seguridad nunca confiar verificar' },
  { title: 'Firewall', section: 'Sección 03', url: 'secciones/03-redes.html', icon: 'fa-network-wired', keywords: 'cortafuegos filtro trafico reglas seguridad' },
  { title: 'VPN', section: 'Sección 03', url: 'secciones/03-redes.html', icon: 'fa-network-wired', keywords: 'red privada virtual cifrado tunel wireguard openvpn' },
  { title: 'GDPR', section: 'Sección 09', url: 'secciones/09-normativas.html', icon: 'fa-gavel', keywords: 'proteccion datos privacidad europea regulacion' },
  { title: 'ISO 27001', section: 'Sección 09', url: 'secciones/09-normativas.html', icon: 'fa-gavel', keywords: 'estandar seguridad informacion gestion riesgos' },
  { title: 'Hack The Box', section: 'Recursos', url: 'recursos.html', icon: 'fa-link', keywords: 'plataforma practica maquinas vulnerables pentesting' },
  { title: 'TryHackMe', section: 'Recursos', url: 'recursos.html', icon: 'fa-link', keywords: 'plataforma aprendizaje guiado labs practicos' },
];

function initSearch() {
  // Create inline search bar HTML
  const searchBar = document.createElement('div');
  searchBar.className = 'search-bar';
  searchBar.id = 'searchBar';
  searchBar.innerHTML = `
    <input type="text" class="search-bar-input" id="searchInput" placeholder="Buscar en la guía..." autocomplete="off">
    <button class="search-bar-close" id="searchClose"><i class="fas fa-times"></i></button>
    <div class="search-bar-results" id="searchResults"></div>
  `;

  // Insert search bar into each navbar (before the icons)
  document.querySelectorAll('.navbar-cyber > .container-fluid').forEach(container => {
    const clonedBar = searchBar.cloneNode(true);
    const icons = container.querySelector('.navbar-icons');
    if (icons) {
      container.insertBefore(clonedBar, icons);
    }
  });

  // Event listeners for search toggle buttons
  document.querySelectorAll('.search-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSearch(btn);
    });
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
      closeAllSearch();
    }
  });

  // Input event for search
  document.querySelectorAll('.search-bar-input').forEach(input => {
    input.addEventListener('input', (e) => {
      performSearch(e.target.value, input.closest('.search-bar'));
    });
    input.addEventListener('click', (e) => e.stopPropagation());
  });

  // Close buttons
  document.querySelectorAll('.search-bar-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllSearch();
    });
  });

  // Keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const firstBar = document.querySelector('.search-bar');
      if (firstBar) toggleSearch(null, firstBar);
    }
    if (e.key === 'Escape') {
      closeAllSearch();
    }
  });
}

function toggleSearch(btn, bar) {
  const searchBar = bar || (btn ? btn.closest('.container-fluid').querySelector('.search-bar') : null);
  if (!searchBar) return;

  const isActive = searchBar.classList.contains('active');
  closeAllSearch();

  if (!isActive) {
    searchBar.classList.add('active');
    const input = searchBar.querySelector('.search-bar-input');
    if (input) setTimeout(() => input.focus(), 100);
  }
}

function closeAllSearch() {
  document.querySelectorAll('.search-bar').forEach(bar => {
    bar.classList.remove('active');
    const input = bar.querySelector('.search-bar-input');
    if (input) input.value = '';
    const results = bar.querySelector('.search-bar-results');
    if (results) {
      results.innerHTML = '';
      results.classList.remove('active');
    }
  });
}

function performSearch(query, searchBar) {
  const resultsContainer = searchBar ? searchBar.querySelector('.search-bar-results') : document.querySelector('.search-bar-results');
  if (!resultsContainer) return;
  
  const baseUrl = window.location.pathname.includes('/secciones/') ? '../' : '';

  if (query.length < 2) {
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('active');
    return;
  }

  const lowerQuery = query.toLowerCase();
  const results = SEARCH_DATA.filter(item => {
    return item.title.toLowerCase().includes(lowerQuery) ||
           item.keywords.toLowerCase().includes(lowerQuery) ||
           item.section.toLowerCase().includes(lowerQuery);
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search"></i>
        <p>Sin resultados para "${query}"</p>
      </div>
    `;
    resultsContainer.classList.add('active');
    return;
  }

  resultsContainer.innerHTML = results.map(item => `
    <a href="${baseUrl}${item.url}" class="search-result-item">
      <i class="fas ${item.icon}"></i>
      <div>
        <div class="result-title">${item.title}</div>
        <div class="result-section">${item.section}</div>
      </div>
    </a>
  `).join('');
  resultsContainer.classList.add('active');
}

document.addEventListener('DOMContentLoaded', initSearch);
