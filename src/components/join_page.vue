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
                <input type="text" v-model="user.client_first_name" placeholder="Имя">
                <input type="text" v-model="user.client_last_name" placeholder="Фамилия">
                <input type="text" v-model="user.client_middle_name" placeholder="Отчество">
                <input type="tel" v-model="user.client_phone_number" placeholder="Номер телефона">
                <input type="date" v-model="user.client_birth_date" placeholder="Дата рождения">
                <input type="password" v-model="user.client_password_hash" placeholder="Пароль">
                <input type="password" v-model="confirmPassword" placeholder="Повторите пароль">
                <button @click.prevent="registerUser()">Зарегистрироваться</button>
                <div v-if="errorMessages.length">
                    <p v-for="error in errorMessages" :key="error">{{ error }}</p>
                </div>
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
            confirmPassword: "",
            errorMessages: [],
            user: {
                client_first_name: "",
                client_last_name: "",
                client_middle_name: "",
                client_birth_date: "",
                client_phone_number: "",
                client_password_hash: ""
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
            this.errorMessages = [];
            // Проверка на заполненность всех обязательных полей
            const requiredFields = {
                'Имя': this.user.client_first_name,
                'Фамилия': this.user.client_last_name,
                'Отчество': this.user.client_middle_name,
                'Дата рождения': this.user.client_birth_date,
                'Номер телефона': this.user.client_phone_number,
                'Пароль': this.user.client_password_hash
            };

            for (const [key, value] of Object.entries(requiredFields)) {
                if (!value) this.errorMessages.push(`Поле "${key}" не должно быть пустым.`);
            }

            // Проверка совпадения паролей
            if (this.user.client_password_hash !== this.confirmPassword) {
                this.errorMessages.push("Пароли не совпадают.");
            }

            // Если есть ошибки, не отправляем форму
            if (this.errorMessages.length > 0) {
                return;
            }

            try {
                // Добавляем email в данные для отправки
                let userData = {
                    ...this.user,
                    client_email: this.email
                };
                
                let response = await fetch('http://localhost:8080/api/user/register', {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-Type': 'application/json' }
                });
                let data = await response.json();
                if (data.success) {
                    const token = data.access_token;
                    localStorage.setItem('client_token', token); // Исправлено на правильное имя переменной 'token'
                    this.$emit('authenticated', token);
                    // Перенаправление пользователя на приветственную страницу
                    this.$router.push('/main/welcome');
                } else {
                    // Добавление ошибок сервера в массив ошибок клиента
                    this.errorMessages.push('Произошла ошибка при регистрации: ' + JSON.stringify(data.errors));
                }
            } catch (error) {
                console.error('Error:', error);
                this.errorMessages.push('Ошибка соединения с сервером.');
            }
        },

        async login() {
            try {
                let response = await fetch('http://localhost:8080/api/user/login', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        client_email: this.email, 
                        client_password_hash: this.password 
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                let data = await response.json();

                if (data.success) {
                    const token = data.access_token;
                    localStorage.setItem('client_token', token); // Исправлено на правильное имя переменной 'token'
                    this.$emit('authenticated', token);
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


