// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("open");
});

closeMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu if open
    mobileMenu.classList.remove("open");
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
};

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// 3D Background with Three.js
const initThreeJS = () => {
  const container = document.getElementById("canvas-container");

  // Only initialize if container exists
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Add some floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Add a subtle light
  const light = new THREE.DirectionalLight(0x7c3aed, 0.5);
  light.position.set(0, 1, 1);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xec4899, 0.2);
  scene.add(ambientLight);

  camera.position.z = 3;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

// Initialize Three.js when DOM is loaded
document.addEventListener("DOMContentLoaded", initThreeJS);

// GSAP animations
gsap.from(".hero-gradient", {
  duration: 1.5,
  opacity: 0,
  y: -50,
  ease: "power3.out",
});

gsap.from(".card-3d", {
  duration: 1.5,
  opacity: 0,
  x: 50,
  rotateY: 180,
  ease: "back.out(1.7)",
  delay: 0.5,
});

gsap.from(".section-title", {
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  duration: 0.8,
  opacity: 0,
  y: 30,
  ease: "power2.out",
});
