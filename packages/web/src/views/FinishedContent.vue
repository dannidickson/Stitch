<template>
  <div class="finished-content">
    <h1>Your site is ready!</h1>
    <div class="success-message">
      <img src="../assets/images/icons/checkmark.svg" alt="Success" class="success-icon" />
      <p>Your site has been successfully configured and is ready to go.</p>
    </div>
    <div class="next-steps">
      <h2>Next Steps</h2>
      <ul>
        <li>Check your project directory for the new files</li>
        <li>Follow the README instructions to start development</li>
        <li>Begin customizing your templates and content</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.finished-content {
  padding: 2rem;
  text-align: center;
}

.success-message {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.success-icon {
  width: 32px;
  height: 32px;
}

.next-steps {
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.next-steps h2 {
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style-type: none;
  padding: 0;
}

.next-steps li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.next-steps li::before {
  content: "→";
  position: absolute;
  left: 0;
}
</style> 