<template>
  <div class="background-canvas" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useThreeScene } from '@/composables/useThreeScene';

const container = ref<HTMLDivElement | null>(null);

const { initScene, cleanupScene } = useThreeScene();

onMounted(() => {
  if (container.value) {
    initScene(container.value);
  }
});

onUnmounted(() => {
  cleanupScene();
});
</script>

<style lang="scss" scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-background);
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    var(--color-bg-primary) 0%,
    var(--color-bg-secondary) 100%
  );
}
</style> 