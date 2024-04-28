<template>
    <div class="container">
      <header>
        <div class="tabs">
          <button class="tab" :class="{ active: activeTab === 'upcoming' }" @click="setActiveTab('upcoming')">Ближайшие</button>
          <button class="tab" :class="{ active: activeTab === 'past' }" @click="setActiveTab('past')">Прошедшие</button>
        </div>
      </header>
      <p class="message">{{ messageText }}</p>
      <div></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'upcoming',
      };
    },
    computed: {
      messageText() {
        if (this.activeTab === 'past') {
          return 'Вы еще не посещали ни одного занятия';
        } else {
          return 'У вас ещё нет записей';
        }
      }
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      }
    }
  };
  </script>
  
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    text-align: center;
    background-color: #3a3b3c;
    height: 90%;
    padding: 15px;
  }

  h1, h2 {
    color: #8ed8f8;
    font-weight: 700;
    font-size: 40px;
  }
  
  header {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .tab {
    padding: 8px 16px;
    background-color: #59595a;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-weight: 500;
  }
  
  .tab.active {
    background-color: #989899;
    font-weight: 700;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
  }
  
  .message {
    margin-bottom: 20px;
    font-size: 30px;
    color: #8ed8f8;
  }
  
  .refresh-btn {
    padding: 10px 20px;
    background-color: #8ed8f8;
    border: none;
    border-radius: 20px;
    color: #3a3b3c;
    font-size: 20px;
    font-weight: 900;
  }

  .refresh-btn:hover {
    transform: scale(1.05);
    background-color: #d4ebff;
    box-shadow: 0 12px 20px rgba(172, 230, 253, 0.5);
  }
  </style>
  