<template>
  <div class="app-container">
    <SpaceBackground />
    <nav class="nav-container">
      <NuxtLink to="/" class="logo">
        <img 
          src="../public/logo.png" 
          alt="Evergreen Dev Labs" 
          class="logo-image"
        />
        <span class="logo-text">EVERGREEN DEV</span>
      </NuxtLink>
      
      <!-- Mobile Menu Button -->
      <button class="menu-btn show-sm" @click="toggleMenu">
        <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" />
      </button>

      <!-- Desktop Navigation -->
      <div class="nav-links hide-sm" :class="{ 'active': isMenuOpen }">
        <NuxtLink to="/">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink to="/projects">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink to="/about">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact">{{ $t('nav.contact') }}</NuxtLink>
      </div>
    </nav>
    <div class="language-switcher">
      <button
        v-for="loc in availableLocales"
        :key="loc.code"
        @click="switchLanguage(loc.code)"
        :class="['lang-btn', { active: currentLocale === loc.code }]"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import SpaceBackground from '~/components/SpaceBackground.vue';

const { t, locale } = useI18n();
const isMenuOpen = ref(false);

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  // 하드코딩된 로케일 배열 사용
  return [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' }
  ];
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const switchLanguage = (newLocale: string) => {
  locale.value = newLocale;
};

// Close menu when route changes
watch(() => useRoute().path, () => {
  isMenuOpen.value = false;
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: transparent;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-md) var(--space-lg);
  position: fixed;
  width: 100%;
  background: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 1rem;
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
}

.logo-text {
  color: var(--text-color-light);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: 'Space Mono', monospace;
  background: linear-gradient(120deg, #64ffda, #64ffda);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(100, 255, 218, 0.2);
  transition: all 0.3s ease;
}

.logo:hover .logo-text {
  text-shadow: 2px 2px 15px rgba(100, 255, 218, 0.4);
  transform: translateY(-1px);
}

.nav-links {
  padding-top: var(--space-md);
  display: flex;
  align-items: flex-start;
}

.nav-links a {
  margin-left: 2rem;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--accent-color);
}

.menu-btn {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: var(--font-size-lg);
  cursor: pointer;
  align-self: flex-start;
  margin-top: var(--space-md);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--bg-color);
    padding: var(--space-md);
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    transform: translateY(-100%);
    transition: var(--transition-normal);
  }

  .nav-links.active {
    transform: translateY(0);
  }

  .logo-image {
    height: 45px;
  }

  .logo-text {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}

.language-switcher {
  position: fixed;
  top: calc(var(--header-height) + 1.5rem);
  right: 1rem;
  display: flex;
  gap: 0.3rem;
  z-index: 1000;
  backdrop-filter: blur(8px);
  padding: 0.2rem;
  border-radius: 6px;
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid rgba(100, 255, 218, 0.1);
}

.lang-btn {
  padding: 0.3rem 0.5rem;
  background: transparent;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: monospace;
  letter-spacing: 1px;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-1px);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
  }

  &.active {
    background: var(--accent-color);
    color: var(--bg-color);
  }
}

@media (max-width: 768px) {
  .language-switcher {
    top: var(--space-md);
    right: var(--space-lg);
    padding: 0.15rem;
    background: rgba(10, 25, 47, 0.5);
  }

  .lang-btn {
    padding: 0.2rem 0.35rem;
    font-size: 0.7rem;
  }
}

@media (max-width: 380px) {
  .language-switcher {
    right: var(--space-lg);
  }
}
</style> 