import { createStore } from 'vuex'

export default createStore({
  state: {
    events: [
      // Пример данных
      { id: 1, title: "Растяжка шпагаты", time: "10:50-11:45", date: "Сегодня",  spots: 3, instructor: "Вероника Иоселевич" },
      { id: 2, title: "Растяжка шпагаты", time: "10:50-11:45", date: "Сегодня",  spots: 3, instructor: "Вероника Иоселевич" },
      { id: 3, title: "Растяжка шпагаты", time: "10:50-11:45", date: "Сегодня",  spots: 3, instructor: "Вероника Иоселевич" },
      // Добавьте больше данных
    ]
  },
  getters: {
    events: state => state.events
  }
})

