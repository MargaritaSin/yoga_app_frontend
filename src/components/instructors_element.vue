<template>
    <div class="app">
    <h1>Наши тренера</h1>
      <div class="search-bar">
        <input type="text" placeholder="Введите имя тренера" v-model="searchQuery">
      </div>
      <div class="trainers">
        <div v-for="trainer in filteredTrainers" :key="trainer.id" class="trainer-card">
          <img :src="trainer.photo" alt="Фото тренера" class="trainer-photo"/>
          <div class="trainer-info">
            <h3>{{ trainer.name }}</h3>
            <div class="trainer-likes">
              <i class="material-icons">star_rate</i>
              <span>{{ trainer.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      const trainers = ref([
        { id: 1, name: "Анна Винокурова", likes: 5, photo: "@/assets/photos/instr1.jpg" },
        { id: 2, name: "Александра Луценкова", likes: 5, photo: "/images/2.jpeg" },
        { id: 3, name: "Валерия Калентьева", likes: 5, photo: "/images/3.jpeg" },
        { id: 4, name: "Татьяна Фролова", likes: 5, photo: "/images/4.jpeg" }
      ]);
  
      const searchQuery = ref('');
  
      const filteredTrainers = computed(() => {
        return trainers.value.filter(trainer =>
          trainer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return {
        searchQuery,
        filteredTrainers
      };
    }
  };
  </script>
  
  <style scoped>
  .app {
    max-width: 600px;
    margin: 0 auto;
    color: #fff;
    background: #333;
  }

  h1, h2 {
    color: #8ed8f8;
    font-weight: 700;
    font-size: 40px;
  }
  
  .search-bar input {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    background: #222;
    border: 1px solid #444;
    color: #fff;
  }
  
  .trainers {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-around;
  }
  
  .trainer-card {
    width: 45%;
    background: #444;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
  }

  .trainer-card:hover {
    transform: scale(1.05); /* Увеличение масштаба при наведении */
    box-shadow: 0 12px 20px rgba(172, 230, 253, 0.5); /* Увеличение тени для лучшего выделения */
  }
  
  .trainer-photo {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .trainer-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
  
  .trainer-info h3 {
    font-size: 18px;
    margin: 0;
  }
  
  .trainer-likes {
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  
  .material-icons {
    color: #8ed8f8; /* зелёный цвет */
    margin-right: 5px;
    font-size: 24px;
  }
  </style>
  