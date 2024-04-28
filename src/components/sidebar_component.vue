<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="../assets/logo.webp" alt="Логотип">
    </div>
    <ul class="sidebar-menu">
      <li><router-link to="/main/profile"><i class="material-icons">person</i>Профиль</router-link></li>
      <li><router-link to="/main/my_classes"><i class="material-icons">format_list_bulleted</i>Мои занятия</router-link></li>
      <li><router-link to="/main/schedule"><i class="material-icons">schedule</i>Расписание</router-link></li>
      <li><router-link to="/main/membership"><i class="material-icons">card_membership</i>Магазин</router-link></li>
      <li><router-link to="/main/instructors"><i class="material-icons">sports</i>Тренеры</router-link></li>
      <!-- Добавьте соответствующие пути для других элементов -->
    </ul>
  </div>
</template>

  
  <script>
  export default {
    name: 'SidebarMenu'

  }
  </script>
  
  <style scoped>
    * {
        margin: 0;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        display: flex;
    }

    .sidebar {
        width: 240px;
        height: 100vh;
        background-color: #242526;
        color: #ffffff;
        display: flex;
        flex-direction: column;
    }

    .sidebar-header {
        padding: 20px;
    }

    .sidebar-menu {
        list-style: none;
        padding: 0;
    }

    .sidebar-menu li a {
        text-decoration: none;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 10px 20px;
        transition: background-color 0.3s;
    }

    .sidebar-menu li a:hover {
        background-color: #3a3b3c;
    }

    .material-icons {
        margin-right: 10px;
        /* Предполагается, что у вас будет SVG или иконка шрифта */
    }

    img {
      width: 280px;
      height: 160px;
    }

    .sidebar-menu li .router-link-active {
    background-color: #3a3b3c; /* Цвет фона для активной ссылки */
    color: #9cc9f3; /* Цвет текста для активной ссылки */
    }

  </style>
  