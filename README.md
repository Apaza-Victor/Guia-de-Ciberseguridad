# 🛡️ Guía de Ciberseguridad - De Cero a Experto

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-562D91?style=for-the-badge&logo=bootstrap&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

## 📋 Descripción

Una guía completa e interactiva para aprender ciberseguridad desde cero hasta nivel experto. Incluye visualizaciones 3D, ejemplos de código reales, herramientas profesionales y ejercicios prácticos.

### 🎯 Características Principales

- 🎨 **Diseño Moderno** - Interfaz glassmorphism con gradientes y efectos glow
- 🌐 **Visualizaciones 3D** - Gráficos interactivos con Three.js
- 📱 **100% Responsive** - Adaptado a todos los dispositivos
- 🎯 **10 Secciones Completas** - Desde fundamentos hasta certificaciones
- 💻 **Código Real** - Ejemplos prácticos y comandos de terminal
- 🔗 **Navegación Independiente** - Cada sección es un archivo HTML separado
- 🎨 **Efectos Animados** - Scroll animations, hover effects, typing effects

## 📁 Estructura del Proyecto

```
Guia-de-Ciberseguridad/
├── index.html                    # Página principal con navegación
├── herramientas.html             # Herramientas de ciberseguridad
├── comandos.html                 # Comandos esenciales de terminal
├── recursos.html                 # Recursos y enlaces útiles
├── README.md                     # Documentación del proyecto
├── .gitignore                    # Archivos excluidos de git
├── .nojekyll                     # Desactiva Jekyll en GitHub Pages
├── css/
│   └── styles.css               # Estilos principales con modo light/dark
├── js/
│   ├── theme.js                 # Efectos 3D, animaciones y toggle theme
│   └── section-nav.js           # Navegación entre secciones
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions para despliegue automático
└── secciones/
    ├── 01-introduccion.html     # Introducción a la Ciberseguridad
    ├── 02-amenazas.html         # Amenazas y Vulnerabilidades
    ├── 03-redes.html            # Redes y Protocolos
    ├── 04-criptografia.html     # Criptografía
    ├── 05-sistemas.html         # Seguridad en Sistemas Operativos
    ├── 06-hacking.html          # Hacking Ético y Pentesting
    ├── 07-seguridad-web.html    # Seguridad Web
    ├── 08-forense.html          # Forense Digital
    ├── 09-normativas.html       # Normativas y Cumplimiento
    └── 10-certificaciones.html  # Certificaciones y Hoja de Ruta
```

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
```bash
# Simplemente abre index.html en tu navegador
open index.html
```

### Opción 2: Servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

### Opción 3: Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Clic derecho en index.html → "Open with Live Server"

### Opción 4: GitHub Pages (Despliegue Online)

1. Sube el código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Apaza-Victor/Guia-de-Ciberseguridad.git
git branch -M main
git push -u origin main
```

2. Activa GitHub Pages:
   - Ve a **Settings** → **Pages**
   - Selecciona **main** branch
   - Selecciona **/ (root)** folder
   - Haz clic en **Save**

3. Tu sitio estará disponible en:
   ```
   https://apaza-victor.github.io/Guia-de-Ciberseguridad/
   ```

> 💡 **Tip:** El despliegue es automático con GitHub Actions cada vez que hagas push a main.

## 📚 Contenido de las Secciones

### 1️⃣ Introducción a la Ciberseguridad
- Historia de la ciberseguridad
- Principios CIA (Confidentiality, Integrity, Availability)
- Dominios de la ciberseguridad
- Panorama actual 2025

### 2️⃣ Amenazas y Vulnerabilidades
- Tipos de malware (virus, ransomware, troyanos, gusanos, spyware)
- Ingeniería social y phishing
- Vulnerabilidades comunes (CVE)
- OWASP Top 10

### 3️⃣ Redes y Protocolos
- Modelo OSI y TCP/IP
- Dispositivos de seguridad (Firewalls, IDS/IPS, VPN)
- Segmentación de red

### 4️⃣ Criptografía
- Cifrado simétrico vs asimétrico
- Funciones hash
- PKI y certificados digitales
- Criptografía cuántica

### 5️⃣ Seguridad en Sistemas Operativos
- Hardening de Linux y Windows
- Gestión de usuarios y permisos
- Auditoría y logs

### 6️⃣ Hacking Ético y Pentesting
- Metodologías de pentesting (5 fases)
- Herramientas de testing
- Entornos de práctica

### 7️⃣ Seguridad Web
- OWASP Top 10 detallado
- SQL Injection, XSS, CSRF
- Herramientas de testing web

### 8️⃣ Forense Digital
- Proceso forense
- Análisis de malware
- Respuesta a incidentes

### 9️⃣ Normativas y Cumplimiento
- ISO 27001, GDPR, PCI-DSS
- NIST Framework
- Gestión de riesgos

### 🔟 Certificaciones
- Rutas de aprendizaje por nivel
- Certificaciones recomendadas
- Carreras en ciberseguridad

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Estilos, animaciones, glassmorphism |
| JavaScript | Interactividad, efectos 3D |
| Bootstrap 5 | Grid system, navbar responsive |
| Three.js | Visualizaciones 3D |
| Font Awesome 6 | Iconografía |
| AOS | Animaciones al hacer scroll |

## 🎨 Diseño

### Paleta de Colores
- **Primary:** `#00f0ff` (Cyan)
- **Secondary:** `#7b2ff7` (Purple)
- **Accent:** `#ff2e63` (Pink)
- **Background:** `#0a0a1a` (Dark Navy)

### Efectos Visuales
- Glassmorphism en tarjetas y navbar
- Gradient borders animados
- Glow effects en botones
- 3D transforms en cards
- Scroll animations

## 📖 Para Aprender

### Nivel Básico (0-3 meses)
1. CompTIA Security+
2. Fundamentos de redes
3. Linux básico
4. Python para automatización

### Nivel Intermedio (3-12 meses)
1. CEH / eJPT
2. Hacking ético
3. Análisis de vulnerabilidades
4. SIEM y monitoreo

### Nivel Avanzado (1-3 años)
1. OSCP
2. Pentesting profesional
3. Análisis de malware
4. Arquitectura Zero Trust

### Nivel Experto (3+ años)
1. CISSP
2. Liderazgo en seguridad
3. Arquitectura de seguridad
4. Incident response

## 🔗 Recursos Recomendados

- [TryHackMe](https://tryhackme.com) - Labs interactivos
- [Hack The Box](https://www.hackthebox.com) - Máquinas vulnerable
- [OverTheWire](https://overthewire.org) - Wargames
- [PortSwigger Academy](https://portswigger.net/web-security) - Seguridad web
- [PicoCTF](https://picoctf.org) - Competencias CTF

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama (`git checkout -b feature/nueva-seccion`)
3. Haz commit (`git commit -m 'Add new section'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

Creado con ❤️ para la comunidad de ciberseguridad.

---

> **⚠️ Aviso Legal:** Esta guía es solo para fines educativos. Las técnicas mostradas deben usarse únicamente en entornos autorizados para pruebas de penetración. El uso no autorizado de estas técnicas es ILEGAL.
