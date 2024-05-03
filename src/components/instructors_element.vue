<template>
  <div class="app">
    <h1>Наши тренера</h1>
    <div class="search-bar">
      <input type="text" placeholder="Введите имя тренера" v-model="searchQuery">
    </div>
    <div class="trainers">
      <div v-for="trainer in filteredTrainers" :key="trainer.id" class="trainer-card" @click="openModal(trainer)">
        <img :src="trainer.photo" alt="Фото тренера" class="trainer-photo"/>
        <div class="trainer-info">
          <h3>{{ trainer.full_name }}</h3>
          <div class="trainer-likes">
              <i class="material-icons">star_rate</i>
              <span>5</span>
            </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false"><i class="material-icons">close</i></span>
        <img :src="selectedTrainer.photo" alt="Фото тренера" class="trainer-photo-modal"/>
        <h3>{{ selectedTrainer.full_name }}</h3>
        <p>Опыт работы: {{ selectedTrainer.experience }} лет</p>
        <p>Специализация: {{ selectedTrainer.specialization }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const trainers = ref([]);
    const showModal = ref(false);
    const selectedTrainer = ref({});
    const searchQuery = ref('');

    const fetchTrainers = async () => {
      const token = localStorage.getItem('client_token');
      try {
        const response = await axios.get('http://localhost:8080/api/treners/get-trener', {
          headers: {'Authorization': 'Bearer ' + token}
        });
        trainers.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке данных тренеров:', error);
      }
    };

    onMounted(fetchTrainers);

    const filteredTrainers = computed(() => {
      return trainers.value.filter(trainer =>
        trainer.full_name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const openModal = (trainer) => {
      selectedTrainer.value = trainer;
      showModal.value = true;
    };

    return {
      searchQuery,
      filteredTrainers,
      showModal,
      selectedTrainer,
      openModal,
    };
  }
};
</script>
  
  <style scoped>
  .app {
    max-width: 900px;
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
    width: 100%; /* Ширина фото равна ширине карточки */
    height: 200px; /* Высота фото */
    object-fit: cover; /* Масштабирование фото без потери пропорций */
    object-position: center top;
    border-radius: 10px; /* Закругленные углы у фото */
    }

    .trainer-photo-modal {
    width: 100%; /* Ширина фото равна ширине карточки */
    height: 50%; /* Высота фото */
    object-fit: cover; /* Масштабирование фото без потери пропорций */
    border-radius: 10px; /* Закругленные углы у фото */
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

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    height: 50px;
    width: 50px;
  }
  
  .material-icons {
    color: #8ed8f8; /* зелёный цвет */
    margin-right: 5px;
    font-size: 24px;
  }
  </style>
  