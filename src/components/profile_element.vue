<template>
    <div id="body">
        <div class="profile-card">
            <div class="profile-header">
                <img src="https://via.placeholder.com/120" alt="Аватар клиента" class="profile-avatar">
                <h1>Елена Смирнова</h1>
                <p>Вы наш клиент!<i class="material-icons" id="fav">favorite</i></p>
            </div>
            <div class="profile-content">
                <h2>Контакты</h2>
                <p><i class="material-icons" id="email">email</i> elena@mail.com</p>
                <p><i class="material-icons">phone</i> +7 905 123 4567</p>
                <p><i class="material-icons">celebration</i>30.10.2005</p>
                <button class="btn" @click="showModal = true">Изменить данные</button>
                <button class="btn">Мои абонементы</button>
            </div>
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <span class="close" @click="showModal = false">&times;</span>
                    <h2>Изменение данных</h2>
                    <form>
                        <label for="email">Email:</label>
                        <input class="prof_input" type="email" id="email" name="email" value="elena@mail.com"><br>
                        <label for="phone">Телефон:</label>
                        <input class="prof_input" type="text" id="phone" name="phone" value="+7 905 123 4567"><br>
                        <label for="birthdate">Дата рождения:</label>
                        <input class="prof_input" type="date" id="birthdate" name="birthdate" value="2005-10-30"><br>
                        <button type="submit" class="btn">Сохранить изменения</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        }
    }
}
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

