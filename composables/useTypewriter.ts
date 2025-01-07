import { ref, watch, onMounted, onUnmounted, Ref } from 'vue';

export function useTypewriter(texts: Ref<string[]>) {
  const currentText = ref('');
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingInterval: NodeJS.Timeout;

  const typeText = () => {
    if (!texts.value || texts.value.length === 0) {
      return;
    }

    const currentFullText = texts.value[currentIndex];

    if (!isDeleting && charIndex <= currentFullText.length) {
      currentText.value = currentFullText.substring(0, charIndex);
      charIndex++;
    } else if (isDeleting && charIndex >= 0) {
      currentText.value = currentFullText.substring(0, charIndex);
      charIndex--;
    }

    if (charIndex === currentFullText.length + 1) {
      isDeleting = true;
      setTimeout(() => typeText(), 2000);
      return;
    }

    if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.value.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    typingInterval = setTimeout(typeText, typingSpeed);
  };

  watch(texts, (newTexts) => {
    if (newTexts && newTexts.length > 0) {
      currentIndex = 0;
      charIndex = 0;
      isDeleting = false;
      currentText.value = '';
      clearTimeout(typingInterval);
      typeText();
    }
  }, { immediate: true });

  onMounted(() => {
    if (texts.value && texts.value.length > 0) {
      typeText();
    }
  });

  onUnmounted(() => {
    clearTimeout(typingInterval);
  });

  return {
    currentText
  };
} 