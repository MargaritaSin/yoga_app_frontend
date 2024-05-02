<template>
  <div class="subscription-container">
    <h2>Абонементы</h2>
    <div v-for="item in subscriptions" :key="item.membership_type_id" class="subscription-card" @click="showConfirmation(item)" :style="{ background: item.gradient }">
      <div class="details">
        <div id="top">
          <p>{{ item.classes_included }} занятий на месяц</p>
          <div id="dur" class="duration">{{ item.duration }}</div>
        </div>
        <p id="price">{{ item.membership_type_price }} Р</p>
      </div>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Вы точно хотите купить абонемент «{{ selectedSubscription.membership_type_name }}»?</p>
        <button @click="buySubscription">Да</button>
        <button @click="closeModal">Нет</button>
        <div v-if="purchaseError" class="error-message">
        {{ purchaseError }}
      </div>
    </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionCards',
  data() {
    return {
      subscriptions: [],
      showModal: false,
      selectedSubscription: null,
      purchaseError: ''
    };
  },
  methods: {
    showConfirmation(subscription) {
      this.selectedSubscription = subscription;
      this.purchaseError = '';  // сброс предыдущих ошибок
      this.showModal = true;
    },
    async buySubscription() {
      const token = localStorage.getItem("client_token");
      try {
        const response = await fetch(`http://localhost:8080/api/membership/purchase`, {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            membership_type_id: this.selectedSubscription.membership_type_id
          })
        });

        const data = await response.json();
        if (data.success) {
          console.log('Покупка абонемента успешно совершена');
          this.closeModal();
        } else {
          this.purchaseError = data.message;
        }
      } catch (error) {
        console.error("Error during subscription purchase:", error);
        this.purchaseError = 'Произошла ошибка при покупке абонемента.';
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectedSubscription = null;
    },
    async getSubcriptions() {
      try {
        const token = localStorage.getItem("client_token");
        const response = await fetch("http://localhost:8080/api/membership-type", {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        this.subscriptions = await response.json();
      } catch (error) {
        console.error("Problem fetching subscriptions:", error);
      }
    }
  },
  mounted() {
    this.getSubcriptions();
  }
};
</script>
  
  <style>

  .error-message {
    margin-top: 30px;
  }

  .subscription-container {
    font-family: 'Arial', sans-serif;
    color: #4e4d4d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .subscription-card {
    margin-bottom: 20px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    width: 60%;
    background-color: #585858;
    cursor: pointer;
  }

  .subscription-card:hover {
  transform: scale(1.05); /* Увеличение масштаба при наведении */
  box-shadow: 0 12px 36px rgba(214, 214, 214, 0.5); /* Увеличение тени для лучшего выделения */
  }
  
  .details {
    padding: 20px;
    color: white;
    font-size: 16px;
    font-size: 20px;
    font-weight: 600;
  }
  
  .duration {
    background: #ffffff;
    color: #585858;;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 700;
  }

  #top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  button:hover {
    opacity: 0.9;
    background-color: #88b0d3;
  }

  #price {
    font-size: 25px;
    font-weight: 900;
  }

  h1, h2 {
    color: #8ed8f8;
    font-weight: 700;
    font-size: 40px;
  }

  h3 {
    color: white;
    font-size: 30px;
    text-align: center;
  }

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
  text-align: center;
}

.modal-content button {
  width: 20%;
  margin-right: 50px;
  border-radius: 10px;
}
  </style>
  