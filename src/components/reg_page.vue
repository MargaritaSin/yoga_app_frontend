<template>
   <div class="container">
        <h1>Регистрация</h1>
        <label for="name_in">Имя</label>
        <input type="text" name="name_in">
        <label for="fam_in">Фамилия</label>
        <input type="text" name="fam_in">
        <label for="log_in">Логин</label>
        <input type="text" name="log_in">
        <label for="email_in">Введите свой email:</label>
        <input type="email" name="email_in" placeholder="example@gmail.com">
        <label for="pswd_in">Введите пароль:</label>
        <input type="password" placeholder="123" name="pswd_in">
        <button class="btn">Зарегестрироваться</button>

    </div>
</template>

<script>
import '../styles/style_reg_join.css';
export default {

}
</script>

<style scoped>
    .container {
        width: 400px;
    }
</style>

