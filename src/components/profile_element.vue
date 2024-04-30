<template>
    <div id="body">
        <div class="profile-card">
            <div class="profile-header">
                <img :src="userData.client_photo" alt="Аватар клиента" class="profile-avatar" @click="uploadTrigger">
                <h1>{{ userData.client_first_name }} {{ userData.client_last_name }}</h1>
                <p>Вы наш клиент!<i class="material-icons" id="fav">favorite</i></p>
                <input type="file" ref="fileInput" id="fileInput" @change="handleFileUpload" style="display: none" />
            </div>
            <div class="profile-content">
                <h2>Контакты</h2>
                <p><i class="material-icons" id="email">email</i> {{ userData.client_email }}</p>
                <p><i class="material-icons">phone</i> {{ userData.client_phone }}</p>
                <p><i class="material-icons">celebration</i>{{ userData.client_birth_date }}</p>
                <button class="btn" @click="showModal = true">Изменить данные</button>
                <button class="btn" @click="showSubscriptionsModal = true">Мои абонементы</button>
            </div>
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="showModal = false">&times;</span>
                    <h2>Изменение данных</h2>
                    <form @submit.prevent="updateUserData">
                        <label for="firstName">Имя:</label>
                        <input class="prof_input" type="text" id="firstName" name="firstName" v-model="userData.client_first_name"><br>
                        <label for="lastName">Фамилия:</label>
                        <input class="prof_input" type="text" id="lastName" name="lastName" v-model="userData.client_last_name"><br>
                        <label for="patronymic">Отчество:</label>
                        <input class="prof_input" type="text" id="patronymic" name="patronymic" v-model="userData.client_middle_name"><br>
                        <label for="email">Email:</label>
                        <input class="prof_input" type="email" id="email" name="email" v-model="userData.client_email"><br>
                        <label for="phone">Телефон:</label>
                        <input class="prof_input" type="text" id="phone" name="phone" v-model="userData.client_phone"><br>
                        <label for="birthdate">Дата рождения:</label>
                        <input class="prof_input" type="date" id="birthdate" name="birthdate" v-model="userData.client_birth_date"><br>
                        <button type="submit" class="btn">Сохранить изменения</button>
                    </form>
                </div>
            </div>

            <div v-if="showSubscriptionsModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="showSubscriptionsModal = false">&times;</span>
                    <h2>Мои абонементы</h2>
                    <div v-if="subscriptions.success" id="memberships_list">
                        <div class="subscription-card" v-for="subscription in subscriptions.data" :key="subscription.membership_id">
                            <h3>{{ subscription.membership_type_name }}</h3>
                            <p>Дата покупки: {{ subscription.purchase_date }}</p>
                            <p>Действителен до: {{ subscription.expiration_date }}</p>
                            <p>Остаток занятий: {{ subscription.classes_remaining }}</p>
                            <p v-if="subscription.active_status">Статус: Активен</p>
                            <p v-else>Статус: Неактивен</p>
                        </div>
                    </div>
                    <p v-else>{{ subscriptions.message }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            userData: {},
            subscriptions: [],
            showModal: false,
            showSubscriptionsModal: false,
        };
    },
    created() {
        this.fetchUserInfo();
    },
    mounted() {
        this.fetchSubscriptions();
    },
    methods: {
        async fetchUserInfo() {
            const token = localStorage.getItem('client_token');
            try {
                const response = await fetch('http://localhost:8080/api/user/user-info', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }); 
                const data = await response.json();
                if (data.success) {
                    this.userData = data.data;
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async updateUserData() {
            const token = localStorage.getItem('client_token');
            try {
                const response = await fetch('http://localhost:8080/api/user/update-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        client_first_name: this.userData.client_first_name,
                        client_last_name: this.userData.client_last_name,
                        client_middle_name: this.userData.client_middle_name,
                        client_email: this.userData.client_email,
                        client_phone: this.userData.client_phone,
                        client_birth_date: this.userData.client_birth_date
                    })
                });
                const data = await response.json();
                if (data.success) {
                    alert('Данные обновлены успешно');
                } else {
                    console.error(data.message);
                    alert('Ошибка: ' + data.message);
                }
            } catch (error) {
                console.error('Произошла ошибка при отправке данных', error);
                alert('Произошла ошибка при отправке данных');
            }
        },
        uploadTrigger() {
                this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const token = localStorage.getItem('client_token');
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('avatar', file);

            // Отправка файла на сервер через axios или другой HTTP клиент
            axios.post('http://localhost:8080/api/user/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.data.success) {
                    this.userData.client_photo = response.data.url;
                } else {
                    console.error(response.data.message);
                    // Обрабатывайте ошибку по вашему усмотрению
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке файла: ', error);
            });
        },
        fetchSubscriptions() {
            const token = localStorage.getItem('client_token');
            // Имитация вызова API
            axios.get('http://localhost:8080/api/membership/list-my-memberships', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                        // Проверяем, если сервер вернул успех, сохраняем данные
                        if (response.data.success) {
                            this.subscriptions = response.data;
                        } else {
                            // Если данных нет, сохраняем сообщение для пользователя
                            this.subscriptions = { success: false, message: response.data.message };
                        }
                    })
                    .catch(error => {
                        console.error("Ошибка при получении данных:", error);
                        this.subscriptions = { success: false, message: 'Произошла ошибка при загрузке данных.' };
                    });
        }
    }
};
</script>

<style scoped>

#body {
    display: flex;
    justify-content: center;  /* Горизонтальное центрирование */
    align-items: center; 
    padding: 20px;       
    font-size: 18px;
}

#fav {
    padding-bottom: 4px;
}

.profile-card {
    background-color: #59595a;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: white;
    height: 90%;
    width: 90%;
}

#memberships_list {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.subscription-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
}

.subscription-card h3 {
    margin-top: 0;
}


.btn {
    padding: 10px 20px;
    background-color: #8ed8f8;
    border: none;
    color: #3a3b3c;
    font-size: 20px;
    font-weight: 900;
}

.btn:hover {
    transform: scale(1.05);
    background-color: #d4ebff;
    box-shadow: 0 12px 20px rgba(172, 230, 253, 0.5);
}

h1, h2 {
    color: #8ed8f8;
    font-weight: 700;
    font-size: 40px;
  }

p {
    font-size: 25px;
}

.profile-header {
    background-color: #3a3b3c;
    color: #FFFFFF;
    text-align: center;
    padding: 30px;
}

.profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-content {
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.material-icons {
    vertical-align: middle;
    margin-right: 10px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

label {
    color: #8ed8f8;
}

.modal-content {
    background: #3a3b3c;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    min-height: 500px;
    text-align: center;
}

.close {
    float: right;
    font-size: 28px;
    cursor: pointer;
}

.prof_input {
    width: 90%;
    border: none;
    height: 60px;
    font-size: 20px;
    padding-left: 10px;
}

</style>

