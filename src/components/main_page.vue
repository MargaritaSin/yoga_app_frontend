<template>
    <div class="main-page">
      <Sidebar />
      <div class="content">
        <!-- Этот router-view отобразит компонент, выбранный в sidebar -->
        <router-view />
      </div>
    </div>
</template>
  
<script>
import Sidebar from './sidebar_component.vue';
  
export default {
    components: {
      Sidebar
    }
}
</script>
<style scoped>
  .main-page {
    display: flex;
    height: 100vh; /* Задаем высоту на всю видимую часть экрана */
    width: 100vw;
    margin: 0;
    font-family: Arial, sans-serif;
  }

  .sidebar {
    width: 340px; /* Ширина сайдбара */
    overflow-y: auto; /* Добавляем прокрутку при необходимости */
  }

  .content {
    flex: 1; /* Занимает все оставшееся пространство */
    padding: 20px;
    overflow-y: auto; /* Добавляем прокрутку при необходимости */
    background-color: #333; /* Темный фон для контента */
  }
  </style>
