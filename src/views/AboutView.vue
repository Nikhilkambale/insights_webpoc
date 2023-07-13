<template>
  <!-- <div class="searchbar">
    <input type="text" v-model="searchQuery" placeholder="Search..." />
    </div> -->
  <!-- <div class="form-outline">
  <input type="search" id="form1" class="form-control" placeholder="search" v-model="searchQuery" aria-label="Search" />
</div> -->
  <div class="form-outline">
    <input
      type="text"
      class="form-control form-control-lg rounded"
      placeholder="Search"
      v-model="searchQuery"
      aria-label="Search"
      aria-describedby="basic-addon2"
    />
  </div>

  <!-- <button @click="addCard" style="background-color: green; color: white">
      Add
    </button> -->
  <div>
    <!-- <button @click="togglePopup" style="background-color: green; color: white">
      Add
    </button> -->
    <button type="button" class="btn btn-success"  @click="togglePopup" style="margin-bottom: 2em; width: 6em;" >Add</button>

    <!-- Alert Popup -->
    <div v-if="showPopup" class="alert-popup">
      <div class="alert-popup-content">
        <h3>Add Card</h3>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="heading">Heading:</label>
          <input type="text" id="heading" v-model="heading" />
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="description" />
        </div>
        <button type="button" class="btn btn-primary" @click="addCard">
          Add
        </button>
        <button type="button" class="btn btn-secondary" @click="hidePopup">
          Cancel
        </button>
      </div>
    </div>

    <div class="card mb-3" v-for="card in filteredCards" :key="card.id">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="require(`@/assets/${card.image}`)"
            class="card-img"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div class="d-flex flex-start">
              <img
                class="rounded-circle shadow-1-strong me-3"
                :src="card.avatar"
                alt="avatar"
                width="60"
                height="60"
              />
              <div>
                <h6 class="fw-bold mb-1">{{ card.name }}</h6>
                <div class="d-flex align-items-center mb-3">
                  <p class="mb-0">{{ card.date }}</p>
                </div>
              </div>
            </div>
            <h2 class="card-title fw-bold" style="display: flex">
              {{ card.heading }}
            </h2>
            <p class="card-text">{{ card.description }}</p>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <p class="small mb-0" style="color: #aaa">
                <a href="#!" class="link-grey">{{ card.views }} Views</a>
                <a href="#!" class="link-grey">{{ card.comments }} Comments</a>
                <i
                  :class="card.isFavorite ? 'fas fa-heart' : 'far fa-heart'"
                  style="color: red; margin-left: 46em"
                  @click="toggleFavorite(card)"
                ></i>
                {{ card.likes }}
                <!-- <router-link :to="{ name: 'edit', params: { id: card.id } }">Edit</router-link> -->

                <!-- <button
                  @click="goToEditPage(card.id)"
                  style="background-color: blue; color: white"
                >
                  View
                </button> -->
                <button type="button" class="btn btn-primary"  @click="goToEditPage(card.id)">Edit</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      showPopup: false,
      name: "",
      heading: "",
      description: "",
    };
  },
  mounted() {
    this.$store.dispatch("fetchCards");
  },
  methods: {
    toggleFavorite(card) {
      console.log(card);
      if (card.isFavorite === false) {
        card.likes += 1;
      } else {
        card.likes -= 1;
      }
      card.isFavorite = !card.isFavorite;
    },
    togglePopup() {
      console.log(this.showPopup);
      this.showPopup = true;
    },
    hidePopup() {
      this.showPopup = false;
      // Clear input values when hiding the popup
      this.name = "";
      this.heading = "";
      this.description = "";
    },
    addCard() {
      // Validate input values
      if (!this.name || !this.heading || !this.description) {
        alert("Please enter all fields.");
        return;
      }

      // Create a new card object using the input values
      axios.post("http://localhost:3000/cards", {
        name: this.name,
        heading: this.heading,
        description: this.description,
        image: "bg1.jpg",
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp",
        date: new Date(),
        views: 0,
        comments: 0,
        isFavorite: false,
        likes: 0,
      });

      // Add the new card to your data store or API
      // ...

      // Reset input values and hide the popup
      this.name = "";
      this.heading = "";
      this.description = "";
      this.hidePopup();
      this.$store.dispatch("fetchCards");
      // Show a success message or perform any desired actions
      alert("Card added successfully!");
    },
    goToEditPage(cardId) {
      const card = this.cards.find((card) => card.id === cardId);
      const parsedObject = JSON.stringify(card)
      localStorage.setItem('card',parsedObject)
      this.$router.push({ name: "edit", params: { id: cardId } });
      
      // this.$router.push({ name: 'edit', query: { id: cardId, text: this.editedText } });
    },
    performSearch(query) {
      const lowercaseQuery = query.toLowerCase();
      this.filteredCards = this.cards.filter(
        (card) =>
          card.name.toLowerCase().includes(lowercaseQuery) ||
          card.heading.toLowerCase().includes(lowercaseQuery) ||
          card.description.toLowerCase().includes(lowercaseQuery)
      );
    },
  },

  // addCard() {
  //   // Generate a unique ID for the new card
  //   const newCardId =
  //     this.cards.length > 0 ? this.cards[this.cards.length - 1].id + 1 : 1;

  //   // Create a new card object
  //   const newCard = {
  //     id: newCardId,
  //     name: "New Card",
  //     heading: "New Card Heading",
  //     description: "New Card Description",
  //     // Add other properties as needed
  //   };

  //   // Add the new card to the array of cards
  //   this.cards.push(newCard);

  //    axios.post("http://localhost:3000/cards",{

  //         })
  // },

  created() {
    this.editedText = this.$route.query.text;
  },

  computed: {
    filteredCards() {
      const query = this.searchQuery.toLowerCase();
      if (query == "") return this.cards;

      return this.cards.filter(
        (card) =>
          card.name.toLowerCase().includes(query) ||
          card.heading.toLowerCase().includes(query) ||
          card.description.toLowerCase().includes(query)
      );
    },
    cards() {
      return this.$store.state.cards;
    },
  },
};
</script>
<style scoped>
.form-outline {
  padding: 2em;
}
.card-text {
  font-size: 1.4em;
}
.alert-popup {
  z-index: 1000;
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

.alert-popup-content {
  background-color: #fff;
  padding: 2;
}
.mb-3{
  display: flex;
  margin-bottom: 4rem!important;
  margin: 2em;
}
</style>
