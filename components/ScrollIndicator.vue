<template>
  <div class="scroll-indicator fade-in" :style="{ animationDelay: '1s' }">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
    <div class="scroll-text">{{ t('scroll') }}</div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.scroll-indicator {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  position: relative;
  box-shadow: 0 0 15px rgba(var(--color-primary), 0.2);
}

.wheel {
  width: 3px;
  height: 8px;
  background-color: var(--color-primary);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.6s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(var(--color-primary), 0.5);
}

.scroll-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(var(--color-text-secondary), 0.3);
}
</style> 