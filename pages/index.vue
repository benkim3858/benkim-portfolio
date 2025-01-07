<template>
  <main class="main-container">
    <InteractiveBackground />
    
    <!-- Hero Section -->
    <section id="home" class="section hero-section">
      <div class="hero-content">
        <div class="text-content">
          <h1 class="animate-text">
            Hello, I'm <span class="highlight">Ben</span>
          </h1>
          <p class="typewriter">{{ currentText }}</p>
          <div class="cta-buttons">
            <a href="#projects" class="btn btn-primary">View My Work</a>
            <a href="#contact" class="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="scroll-text">Scroll Down</div>
      </div>
    </section>

    <!-- Expertise Section -->
    <section id="expertise" class="section expertise-section">
      <div class="container">
        <h2 class="section-title text-center">My Expertise</h2>
        <div class="expertise-grid">
          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:web" />
            </div>
            <h3>Web Development</h3>
            <p>Building responsive and performant web applications using modern frameworks and best practices.</p>
            <ul class="expertise-list">
              <li>Vue.js / Nuxt.js</li>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:cellphone" />
            </div>
            <h3>Mobile Development</h3>
            <p>Creating cross-platform mobile applications with native performance and excellent user experience.</p>
            <ul class="expertise-list">
              <li>React Native</li>
              <li>Flutter</li>
              <li>iOS / Swift</li>
              <li>Android / Kotlin</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:database" />
            </div>
            <h3>Backend Development</h3>
            <p>Creating robust and scalable server-side solutions with modern technologies.</p>
            <ul class="expertise-list">
              <li>Node.js / Express</li>
              <li>Python / Django</li>
              <li>RESTful APIs</li>
              <li>Database Design</li>
            </ul>
          </div>

          <div class="expertise-card">
            <div class="expertise-icon">
              <Icon name="mdi:cloud" />
            </div>
            <h3>Cloud Services</h3>
            <p>Deploying and managing applications using cloud infrastructure.</p>
            <ul class="expertise-list">
              <li>AWS / Azure</li>
              <li>Docker / Kubernetes</li>
              <li>CI/CD Pipelines</li>
              <li>Cloud Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <h2 class="section-title text-center">Featured Projects</h2>
        <div class="grid grid-1 grid-2-sm grid-3-md">
          <article v-for="project in projects" 
                   :key="project.id" 
                   class="card project-card">
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
              <div class="project-links">
                <a :href="project.github" target="_blank" class="project-link">
                  <Icon name="mdi:github" />
                </a>
                <a :href="project.demo" target="_blank" class="project-link">
                  <Icon name="mdi:open-in-new" />
                </a>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <div class="about-content grid grid-1 grid-2-md">
          <div class="about-text">
            <h2 class="section-title">About Me</h2>
            <p>{{ aboutText }}</p>
            <div class="skills-container">
              <h3>Skills & Technologies</h3>
              <div class="skills-grid grid grid-2-sm grid-3-md">
                <div v-for="(skill, category) in skills" 
                     :key="category" 
                     class="skill-category">
                  <h4>{{ category }}</h4>
                  <ul>
                    <li v-for="item in skill" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="about-image">
            <img src="" alt="Profile picture">
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
      <div class="container">
        <h2 class="section-title text-center">Get In Touch</h2>
        <div class="contact-container grid grid-1 grid-2-md">
          <div class="contact-info">
            <p>{{ contactText }}</p>
            <div class="social-links">
              <a href="https://github.com/yourusername" target="_blank">
                <Icon name="mdi:github" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank">
                <Icon name="mdi:linkedin" />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank">
                <Icon name="mdi:twitter" />
              </a>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="formData.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import InteractiveBackground from '~/components/InteractiveBackground.vue';

const texts = {
  en: [
    'Full Stack Developer',
    'Web & Mobile Developer',
    '40+ Projects',
  ],
  ko: [
    '풀스택 개발자',
    '디지털 혁신 구현',
    '창의적 문제 해결',
    '최적화된 솔루션 제공'
  ]
};
const currentText = ref(texts.en[0]);
let currentIndex = 0;

// Data
const aboutText = ref(`I'm a passionate full-stack developer with a keen interest in building modern web applications.`);
const contactText = ref(`I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!`);
const formData = ref({
  name: '',
  email: '',
  message: ''
});
const skills = ref({
  'Frontend': ['Vue.js', 'React', 'TypeScript', 'HTML/CSS'],
  'Backend': ['Node.js', 'Python', 'SQL', 'MongoDB'],
  'Tools': ['Git', 'Docker', 'AWS', 'Firebase']
});
const projects = ref([
  {
    id: 1,
    title: "Project One",
    description: "A full-stack web application built with Vue.js and Node.js",
    image: "/images/project1.jpg",
    github: "https://github.com/yourusername/project1",
    demo: "https://project1.demo",
    technologies: ["Vue.js", "Node.js", "MongoDB"]
  },
  // Add more projects...
]);

// Methods
const handleSubmit = async () => {
  // Implement form submission logic
  console.log('Form submitted:', formData.value);
};

// Smooth scroll implementation
onMounted(() => {
  // Typing effect
  setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.en.length;
    currentText.value = texts.en[currentIndex];
  }, 3000);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px'
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

  // Add scroll functionality
  const handleScrollClick = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', handleScrollClick);
  }

  // Clean up
  onUnmounted(() => {
    if (scrollIndicator) {
      scrollIndicator.removeEventListener('click', handleScrollClick);
    }
  });
});
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--space-xl);
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: visible;
}

.hero-content {
  width: 100%;
  max-width: var(--container-lg);
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.text-content {
  position: relative;
}

.animate-text {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: var(--space-md);
  line-height: 1.2;
  background: linear-gradient(to right, #fff, #4af3ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

.highlight {
  color: #4af3ff;
  position: relative;
}

.typewriter {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: #94a3b8;
  margin: var(--space-md) 0;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.3s;
}

.cta-buttons {
  margin-top: var(--space-xl);
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.6s;
}

/* Section Backgrounds */
.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
  z-index: -1;
}

.projects-section::before {
  background: rgba(15, 23, 42, 0.2);
}

.about-section::before {
  background: rgba(15, 23, 42, 0.2);
}

.contact-section::before {
  background: rgba(15, 23, 42, 0.2);
}

/* Buttons */
.btn {
  padding: 0.8em 2em;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: rgba(74, 243, 255, 0.1);
  border: 1px solid #4af3ff;
  color: #4af3ff;
}

.btn-primary:hover {
  background: rgba(74, 243, 255, 0.2);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid #94a3b8;
  color: #94a3b8;
}

.btn-secondary:hover {
  background: rgba(148, 163, 184, 0.2);
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards 1s;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid #4af3ff;
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 3px;
  height: 8px;
  background-color: #4af3ff;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.6s ease-in-out infinite;
}

.scroll-text {
  color: #94a3b8;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@keyframes scrollWheel {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, 12px);
    opacity: 0;
  }
  51% {
    transform: translate(-50%, -12px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .section {
    padding: 0 var(--space-lg);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 0 var(--space-md);
  }

  .scroll-indicator {
    bottom: 1.5rem;
  }
}

.expertise-section {
  padding: var(--space-xxl) 0;
}

.expertise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-top: var(--space-xl);
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.expertise-card {
  background: rgba(10, 25, 47, 0.7);
  border-radius: 12px;
  padding: var(--space-lg);
  transition: transform 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
}

.expertise-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
}

.expertise-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: var(--space-md);
}

.expertise-card h3 {
  color: var(--text-color-light);
  margin-bottom: var(--space-sm);
  font-size: 1.5rem;
}

.expertise-card p {
  color: var(--text-color);
  margin-bottom: var(--space-md);
  line-height: 1.6;
}

.expertise-list {
  list-style: none;
  padding: 0;
}

.expertise-list li {
  color: var(--text-color-light);
  margin-bottom: var(--space-xs);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.expertise-list li::before {
  content: "▹";
  color: var(--accent-color);
}

@media (min-width: 1200px) {
  .expertise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .expertise-grid {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .expertise-card {
    padding: var(--space-md);
  }
}
</style>
