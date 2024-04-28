<template>
    <div class="welcome-screen">
      <img src="../assets/logo.webp">
      <h1>Студия йоги "Волна"</h1>
      <p>Добро пожаловать в ваш персональный помощник по йоге. Начните свое путешествие с нами!</p>
      <button @click="joinClass">Записаться на занятие</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WelcomeScreen',
    methods: {
      joinClass() {
        // Предполагаемый метод для регистрации на класс.
        console.log("Регистрация на занятие");
      }
    }
  }
  </script>

  <style scoped>
  .welcome-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #88b0d3; /* светло-голубой текст */
  }

  img {
    width: 50%;
    height: 30%;
  }
  
  h1 {
    color: #88b0d3;
    font-size: 3em;
    font-weight: 600;
  }
  
  p {
    font-size: 1.2em;
    font-weight: 300;
    text-align: center;
    margin: 0 20px;
  }
  
  button {
    font-size: 1.2em;
    padding: 10px 20px;
    border: 2px solid #88b0d3;
    border-radius: 5px;
    color: #88b0d3;
    background-color: transparent;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #88b0d3;
    color: #002b36;
  }
  </style>
  