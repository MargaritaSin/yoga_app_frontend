<template>
  <div class="date-picker">
    <button @click="changeDate('prev')">&#8249;</button>
    <h1>{{ formattedDate }}</h1>
    <button @click="changeDate('next')">&#8250;</button>
  </div>

  <div class="schedule-container">
    <div v-if="!schedules.length"><h1>Нет занятий на эту дату</h1></div>
    <div v-else v-for="schedule in schedules" :key="schedule.id" @click="selectSchedule(schedule)" id="schedule_content" >
      <h3>{{ schedule.name }}</h3>
      <!-- Изменение формата времени -->
      <p>{{ schedule.formatted_time }} / Инструктор: {{ schedule.instructor_name }}</p>
    </div>
  </div>

  <!-- Модальное окно -->
  <div v-if="selectedSchedule" class="modal">
    <div class="modal-content">
      <h2>{{ selectedSchedule.name }} / {{ selectedSchedule.instructor_name }}</h2>
      <p><strong>Время занятия:</strong> {{ selectedSchedule.formatted_time }}</p>
      <p><strong>Описание:</strong> {{ selectedSchedule.description }}</p>
      <p><strong>Макс. участников:</strong> {{ selectedSchedule.max_participants }}</p>
      <p><strong>Текущее число участников:</strong> {{ selectedSchedule.current_participants }}</p>
      <p><strong>Тип йоги:</strong> {{ selectedSchedule.yoga_type }}</p>
      <button @click="bookSchedule">Записаться на занятие</button>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>



<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import { addDays, subDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default {
  setup() {
    const currentDate = ref(new Date());
    const schedules = ref([]);
    const selectedSchedule = ref(null);
    
    const formattedDate = computed(() => {
      return format(currentDate.value, 'PPPP', { locale: ru });
    });

    function changeDate(direction) {
      if (direction === 'next') {
        currentDate.value = addDays(currentDate.value, 1);
      } else if (direction === 'prev') {
        currentDate.value = subDays(currentDate.value, 1);
      }
      fetchSchedules(); 
    }

    async function fetchSchedules() {
    const dateString = format(currentDate.value, 'yyyy-MM-dd');
    const token = localStorage.getItem('client_token');
    try {
      const response = await axios.get(`http://localhost:8080/api/schedule/${dateString}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success && response.data.schedule) {
        schedules.value = response.data.schedule.map(item => ({
          ...item,
          formatted_time: item.schedule_time.split(':').slice(0, 2).join(':'), // Форматирование времени без секунд
        }));
      } else {
        schedules.value = [];
      }
    } catch (error) {
      console.error("Ошибка при получении расписания:", error);
      schedules.value = [];
    }
  }

    function selectSchedule(schedule) {
      selectedSchedule.value = schedule;
    }

    function closeModal() {
      selectedSchedule.value = null;
    }

    async function bookSchedule() {
      // Берем токен из локального хранилища или иного источника для авторизации
      const token = localStorage.getItem('client_token');
      // URL может зависеть от вашей конкретной реализации API
      const url = `http://localhost:8080/api/registration/register`;
      const dateString = format(currentDate.value, 'yyyy-MM-dd');
      const schedule_id = selectedSchedule.value.schedule_id;

      try {
        const response = await axios.post(url, {
          schedule_id: schedule_id,
          date: dateString 
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          console.log("Запись на занятие прошла успешно");
          // Обновить данные о расписании или какие-либо статусы представления
          alert("Вы успешно записаны на занятие!");
          closeModal(); // Закрыть модальное окно после удачной регистрации
        } else {
          console.error("Ошибка при записи на занятие:", response.data.message);
          alert("Ошибка при записи на занятие: " + response.data.message);
        }
      } catch (error) {
        console.error("Сетевая ошибка при записи на занятие:", error);
        alert("Сетевая ошибка при попытке записи на занятие");
      }
    }

    fetchSchedules();
    return {
      currentDate,
      changeDate,
      schedules,
      formattedDate,
      selectedSchedule,
      selectSchedule,
      closeModal,
      bookSchedule
    }
  }
}
</script>

<style scoped>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #59595a;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 600px;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

h1 {
  margin-right: 30px;
  margin-left: 30px;
}

.date-picker button {
  margin: 0 10px;
  width: 10%;
  border-radius: 40px;
}

.schedule-container div {
  margin-top: 10px;
}

#schedule_content {
  background-color: #59595a;
  border-radius: 15px;
  padding: 15px;
  font-weight: 600;
  font-size: 20px;
  color: white;
}
</style>
