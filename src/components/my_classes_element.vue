<template>
  <div class="container">
    <header>
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'upcoming' }" @click="setActiveTab('upcoming')">Ближайшие</button>
        <button class="tab" :class="{ active: activeTab === 'past' }" @click="setActiveTab('past')">Прошедшие</button>
      </div>
    </header>
    <h1 class="message">{{ messageText }}</h1>
    <div v-if="activeTab === 'upcoming'">
      <div v-for="session in upcomingSessions" :key="session.id" class="card">
        <h2>{{ session.class_name }}</h2>
        <h3>Преподаватель: {{ session.instructor }}</h3>
        <h3>Дата: {{ new Date(session.date).toLocaleDateString() }}</h3>
      </div>
    </div>
    <div v-if="activeTab === 'past'">
      <div v-for="session in pastSessions" :key="session.id" class="card">
        <h2>{{ session.class_name }}</h2>
        <h3>Преподаватель: {{ session.instructor }}</h3>
        <h3>Дата: {{ new Date(session.date).toLocaleDateString() }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeTab: 'upcoming',
      sessions: [],
      upcomingSessions: [],
      pastSessions: [],
    };
  },
  mounted() {
    this.fetchSessions();
  },
  computed: {
      messageText() {
        if (this.activeTab === 'upcoming') {
          if (this.upcomingSessions.length === 0) {
            return 'У вас ещё нет записей';
          }
        } else {
          if (this.pastSessions.length === 0) {
            return 'Вы еще не посещали ни одного занятия';
          }
        }
        return '';
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    fetchSessions() {
      const token = localStorage.getItem('client_token');
      axios.get('http://localhost:8080/api/classes/get-class', {
        headers: {'Authorization': 'Bearer ' + token}
      })
        .then(response => {
          const now = new Date();
          this.sessions = response.data;

          this.pastSessions = this.sessions.filter(session => new Date(session.date) < now);
          this.upcomingSessions = this.sessions.filter(session => new Date(session.date) >= now);
        })
        .catch(error => {
          console.error('There was an error fetching the sessions:', error);
        });
    }
  }
};
</script>
  
  
  <style scoped>
  .container {
    padding: 20px;
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
    margin-bottom: 50px;
  }
  
  .card {
    border: 3px solid #8ed8f8;
    background-color: #4c4d4e;
    color: rgb(236, 236, 236);
    font-size: 14px;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: left;
  }

  .card h1,h2 {
    font-size: 25px;
  }

  h3 {
    font-size: 17px;
  }
  .tabs {
    margin-bottom: 10px;
  }
  .tab {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: #eee;
    margin-right: 50px;
    width: 500px;
  }
  .tab.active {
    background-color: #8ed8f8;
  }
  .message {
    margin-top: 40px;
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
    margin: 300px;
  }

  </style>
  