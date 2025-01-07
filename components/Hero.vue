<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="language-selector">
          <button 
            v-for="locale in availableLocales" 
            :key="locale"
            @click="switchLanguage(locale)"
            :class="{ active: currentLocale === locale }"
            class="lang-btn"
          >
            {{ locale.toUpperCase() }}
          </button>
        </div>
        <h1 class="hero-title fade-in-up">
          {{ t('hello') }} <span class="highlight">Your Name</span>
        </h1>
        <p class="hero-subtitle fade-in-up" :style="{ animationDelay: '0.3s' }">
          {{ currentText }}
        </p>
        <div class="cta-buttons fade-in-up" :style="{ animationDelay: '0.6s' }">
          <a href="#projects" class="btn btn-primary">{{ t('buttons.work') }}</a>
          <a href="#contact" class="btn btn-secondary">{{ t('buttons.contact') }}</a>
        </div>
      </div>
    </div>
    <ScrollIndicator />
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useTypewriter } from '@/composables/useTypewriter';
import ScrollIndicator from './ScrollIndicator.vue';

const { t, locale, availableLocales } = useI18n();

const currentLocale = computed(() => locale.value);

const { currentText } = useTypewriter(computed(() => [
  t('roles.developer'),
  t('roles.uiux'),
  t('roles.creative')
]));

const switchLanguage = (newLocale: string) => {
  locale.value = newLocale;
};
</script>

<style lang="scss" scoped>
.hero-section {
  @extend .section;
  display: flex;
  align-items: center;
}

.hero-content {
  text-align: center;
  backdrop-filter: blur(8px);
  padding: var(--space-lg);
  border-radius: 1rem;
  background: rgba(var(--color-bg-primary), 0.2);
  border: 1px solid rgba(var(--color-primary), 0.1);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: var(--space-md);
  background: linear-gradient(to right, var(--color-text-primary), var(--color-primary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: var(--color-text-secondary);
  margin: var(--space-md) 0;
}

.cta-buttons {
  margin-top: var(--space-xl);
  display: flex;
  justify-content: center;
  gap: var(--space-md);
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

.language-selector {
  position: absolute;
  top: var(--space-md);
  right: var(--space-md);
  display: flex;
  gap: var(--space-xs);
}

.lang-btn {
  padding: var(--space-xs) var(--space-sm);
  background: rgba(var(--color-bg-primary), 0.5);
  border: 1px solid var(--color-primary);
  color: var(--color-text-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--color-primary), 0.2);
  }

  &.active {
    background: var(--color-primary);
    color: var(--color-bg-primary);
  }
}
</style> 