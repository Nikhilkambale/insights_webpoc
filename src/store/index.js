import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    cards: []
  },
  getters: {
  },
  mutations: {
    SET_CARDS(state,data){
      state.cards = data;
    }
  },
  actions: {
    async fetchCards({ commit }) {

      try {

        const data = await axios.get(

          "http://localhost:3000/cards"

        );
          console.log(data.data)
        commit("SET_CARDS", data.data);

      } catch (error) {

        alert(error);

        console.log(error);

      }

    },
  },
  modules: {
  }
})
