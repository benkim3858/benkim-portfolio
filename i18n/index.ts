import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    hello: "Hello, I'm",
    roles: {
      developer: 'Frontend Developer',
      uiux: 'UI/UX Enthusiast',
      creative: 'Creative Coder'
    },
    buttons: {
      work: 'View My Work',
      contact: 'Contact Me'
    },
    scroll: 'Scroll Down',
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    }
  },
  ko: {
    hello: '안녕하세요,',
    roles: {
      developer: '프론트엔드 개발자',
      uiux: 'UI/UX 디자인',
      creative: '크리에이티브 코더'
    },
    buttons: {
      work: '프로젝트 보기',
      contact: '연락하기'
    },
    scroll: '스크롤',
    nav: {
      home: '홈',
      about: '소개',
      projects: '프로젝트',
      contact: '연락처'
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'ko', // 기본 언어
  fallbackLocale: 'en', // 번역 누락시 사용할 언어
  messages,
}); 