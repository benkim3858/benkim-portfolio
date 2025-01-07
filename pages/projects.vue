<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title text-center">My Projects</h2>
      <div class="grid grid-1 grid-2-sm grid-3-md">
        <article v-for="project in projects" :key="project.id" class="card project-card">
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
</template>

<script setup>
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
  // Add more projects here
]);
</script>

<style scoped>
.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-image {
  aspect-ratio: 16/9;
  width: 100%;
  position: relative;
}

@media (max-width: 768px) {
  .project-content {
    padding: var(--space-md);
  }
}

@media (max-width: 480px) {
  .project-tech {
    flex-wrap: wrap;
  }
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-links {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-links {
  opacity: 1;
}

.project-link {
  color: var(--accent-color);
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.project-link:hover {
  transform: scale(1.1);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  color: #fff;
  margin: 0 0 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.project-tech span {
  background: rgba(100, 255, 218, 0.1);
  color: var(--accent-color);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
}
</style> 