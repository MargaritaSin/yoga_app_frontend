<template>
    <div class="subscription-container">
      <h2>По количеству посещений</h2>
      <div v-for="item in subscriptions" :key="item.id" class="subscription-card">
        <div class="details" :style="{background: item.gradient}">
          <div id="top">
            <p>{{ item.sessions }} занятий на месяц</p>
            <div id="dur" class="duration">{{ item.duration }}</div>
          </div>
          <p>{{ item.visits }} посещений</p>
          <p id="price">{{ item.price }} Р</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  name: 'SubscriptionCards',
  data() {
    return {
      subscriptions: [
        {
          id: 1,
          sessions: 4,
          freezeDays: 7,
          visits: 4,
          price: 3800,
          duration: '1 месяц',
          gradient: 'linear-gradient(160deg, #61d9e0 0%, #66a6ff 100%)' // Светло-голубой в голубой
        },
        {
          id: 2,
          sessions: 8,
          freezeDays: 7,
          visits: 8,
          price: 7200,
          duration: '1 месяц',
          gradient: 'linear-gradient(120deg,#66a6ff 0%, #30cfd0 100%)' // Голубой в ярко-голубой
        },
        {
          id: 3,
          sessions: 12,
          freezeDays: 7,
          visits: 12,
          price: 10200,
          duration: '1 месяц',
          gradient: 'linear-gradient(to top, #2e2e64 0%, #30cfd0 100%)' // Сиреневый в темно-синий
        }
      ]
    };
  }
};

  </script>
  
  <style>
  .subscription-container {
    font-family: 'Arial', sans-serif;
    color: #4e4d4d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .subscription-card {
    margin-bottom: 20px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    width: 60%;
    background-color: #585858;
    cursor: pointer;
  }

  .subscription-card:hover {
  transform: scale(1.05); /* Увеличение масштаба при наведении */
  box-shadow: 0 12px 36px rgba(214, 214, 214, 0.5); /* Увеличение тени для лучшего выделения */
  }
  
  .details {
    padding: 20px;
    color: white;
    font-size: 16px;
    font-size: 20px;
    font-weight: 600;
  }
  
  .duration {
    background: #ffffff;
    color: #585858;;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
  }

  #top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  button:hover {
    opacity: 0.9;
    background-color: #88b0d3;
  }

  #price {
    font-size: 25px;
    font-weight: 900;
  }

  h1, h2 {
    color: #8ed8f8;
    font-weight: 700;
    font-size: 40px;
  }
  </style>
  