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
});

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

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleUI(newTheme);
  });
}

function updateToggleUI(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  const icon = toggleBtn.querySelector('i');
  const text = toggleBtn.querySelector('span');
  
  if (theme === 'dark') {
    icon.className = 'fas fa-moon';
    text.textContent = 'Dark';
  } else {
    icon.className = 'fas fa-sun';
    text.textContent = 'Light';
  }
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
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
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
