<template>
    <div class="bg">
        <div class="container">
            <h1>Добро пожаловать в систему!</h1>
            <form v-if="!emailChecked">
                <label for="email_in">Введите свой email:</label>
                <input type="email" v-model="email" placeholder="example@gmail.com">
                <button @click.prevent="checkEmail()">Далее</button>
            </form>
            <form v-else-if="emailExists">
                <label for="email_in">Email:</label>
                <input type="email" v-model="email" disabled>
                <label for="password">Пароль:</label>
                <input type="password" v-model="password" placeholder="Введите пароль">
                <button @click.prevent="login()">Вход</button>
            </form>
            <form v-else>
                <input type="text" v-model="user.firstName" placeholder="Имя">
                <input type="text" v-model="user.lastName" placeholder="Фамилия">
                <input type="tel" v-model="user.phoneNumber" placeholder="Номер телефона">
                <input type="date" v-model="user.birthDate" placeholder="Дата рождения">
                <button @click.prevent="registerUser()">Зарегистрироваться</button>
            </form>
        </div>
    </div>
</template>

<script>
import "../styles/style_reg_join.css"
export default {
    data() {
        return {
            email: "",
            emailChecked: false,
            emailExists: false,
            user: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                birthDate: ""
            }
        };
    },
    methods: {
        async checkEmail() {
            try {
                let response = await fetch('http://localhost:8080/api/user/check-email', {
                    method: 'POST',
                    body: JSON.stringify({ email: this.email }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let data = await response.json();
                this.emailChecked = true;
                this.emailExists = data.exists;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async registerUser() {
            try {
                let response = await fetch('http://localhost:8080/api/user/register',
                
                 {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: { 'Content-Type': 'application/json' }
                });
                let data = await response.json();
                if (data.success) {
                    this.$router.push('/main/welcome');
                } else {
                    alert('Произошла ошибка при регистрации: ' + JSON.stringify(data.errors));
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async login() {
            try {
                let response = await fetch('your_api_endpoint/login', {
                    method: 'POST',
                    body: JSON.stringify({ email: this.email, password: this.password }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let data = await response.json();
                if (data.success) {
                    this.$router.push('/main/welcome');
                } else {
                    alert('Ошибка входа: ' + data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}
</script>


