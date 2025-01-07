<template>
  <section class="section">
    <div class="container">
      <h2 class="section-title text-center">Get In Touch</h2>
      <div class="contact-container grid grid-1 grid-2-md">
        <div class="contact-info">
          <p>I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
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
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
            >
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const formData = ref({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = async () => {
  // Implement your form submission logic here
  console.log('Form submitted:', formData.value);
};
</script>

<style scoped>
.contact-container {
  max-width: var(--container-md);
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-info p {
  font-size: 1.1rem;
  line-height: 1.8;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.social-links a {
  color: var(--text-color);
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  color: var(--accent-color);
  transform: translateY(-3px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #fff;
}

.form-group input,
.form-group textarea {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-family: inherit;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  background: var(--accent-color);
  color: var(--bg-color);
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 255, 218, 0.2);
}

@media (max-width: 768px) {
  .contact-info {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .contact-form {
    margin-top: var(--space-xl);
  }
}
</style> 