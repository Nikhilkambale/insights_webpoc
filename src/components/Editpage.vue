<template>
  <div>
    <div class="add" :style="{ width: sidebarWidth }">
      <a
        href="javascript:void(0)"
        class="closebtn"
        @click="closeNav"
        style="margin-left: -225px"
        >X</a
      >
      <!-- Add your sidebar content here -->

      <ul>
        <li>
          <b-button v-b-tooltip.hover title="Image">
            <label for="uploadImage" class="dropdown-item">
              <i class="fa-solid fa-image" style="font-size: 1.75em"></i>
            </label>
            <input
              type="file"
              id="uploadImage"
              name="uploadImage"
              accept="image/*"
              style="display: none"
              @change="onImageUpload"
            />
          </b-button>
        </li>
        <li>
          <b-button v-b-tooltip.hover title="Chart">
            <a class="dropdown-item" href="#" @click="selectOption('image')"
              ><i
                class="fa-sharp fa-solid fa-chart-simple"
                style="font-size: 1.75em"
              ></i
            ></a>
          </b-button>
        </li>
        <li>
          <b-button v-b-tooltip.hover title="Text box">
            <a class="dropdown-item" href="#" @click="selectOption('image')"
              ><i class="fa-solid fa-font" style="font-size: 1.75em"></i
            ></a>
          </b-button>
        </li>
        <!-- <i class="fa-solid fa-font"></i>  -->

        <li>
          <b-button v-b-tooltip.hover title="Upload">
            <label for="uploadFile" class="dropdown-item">
              <i class="fa-solid fa-upload" style="font-size: 1.75em"></i>
            </label>
            <input
              type="file"
              id="uploadFile"
              name="uploadFile"
              accept=".xlsx,.xls,.doc, .docx,.txt,.pdf"
              style="display: none"
              @change="onUploadFile"
            />
            <!-- <a class="dropdown-item" href="#" @click="selectOption('image')"><i class="fa-solid fa-upload" style="font-size: 1.75em;"></i></a> -->
          </b-button>
        </li>
      </ul>
    </div>

    <div id="main" :style="{ marginLeft: sidebarWidth }">
      <button class="openbtn" @click="openNav">
        <i class="fa-solid fa-plus"></i>
      </button>
      <!-- Add your main content here -->
      <div class="content">
      <div>
        <input type="text" style="height: 3em; font-size: 15px; width: 35em;" v-model="selectedCard.heading" />
      </div>
      <div>
        <input type="text" style="height: 3em; font-size: 15px; margin-top: 1em; width: 35em;" v-model="selectedCard.description" />
      </div>
    </div>
      <button
        type="button"
        class="btn btn-primary"
        style="margin: 2em"
        @click="submitEditForm"
      >
        Submit
      </button>
      <div class="selected-image-container">
        <img :src="selectedImageUrl" v-if="selectedImageUrl" alt="My image" />
        <button
          type="button"
          class="btn btn-primary" style="margin-left: 15em;"
          v-if="selectedImageUrl"
          @click="deleteSelectedImage"
        >
          Delete image
        </button>
      </div>
      <!-- Upload pdf -->
      <div v-if="selectedFileUrl" style="margin-top: -18em;width: 70em;margin-left: 13em;">
        <object
          :data="selectedFileUrl"
          type="application/pdf"
          width="100%"
          height="500px"
        ></object>
        <button
          type="button"
          class="btn btn-primary"
          @click="deleteSelectedFile"
        >
          Delete file
        </button>
      </div>
      <div v-else>
      </div>
      <!-- End pdf upload -->
    </div>
  </div>

  <div v-if="selectedOption === 'image'">
    <ImageComponent />
  </div>
  <div v-if="selectedOption === 'chart'">
    <ChartComponent />
  </div>
  <div v-if="selectedOption === 'textbox'">
    <TextboxComponent />
  </div>
  <div v-if="selectedOption === 'file'">
    <FileComponent />
  </div>

  <!-- 
  <div class="test"> -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cardId: this.$route.params.id,
      sidebarWidth: "0",
      selectedOption: null,
      selectedImageUrl: null,
      selectedFile: null,
      selectedFileUrl: null,
    };
  },
  methods: {
    submitEditForm() {
      const response = axios.put(
        `http://localhost:3000/cards/${this.cardId}`,
        this.selectedCard
      );
      console.log(response);
      this.$router.push({
        name: "about",
      });
    },
    openNav() {
      this.sidebarWidth = "250px";
    },
    closeNav() {
      this.sidebarWidth = "0";
    },
    selectOption(option) {
      if (option === "image") {
        this.selectedOption = option;
      }
    },
    onImageUpload(event) {
      let file = event.target.files[0];
      this.selectedImageUrl = URL.createObjectURL(file);
    },

    previewFile(file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedFileUrl = reader.result;
      };

      reader.readAsDataURL(file);
    },

    onUploadFile(event) {
      let file = event.target.files[0];
      this.selectedFile = file;
      this.selectedFileUrl = null;
      this.previewFile(file);
      console.log("selectedFile---> ", this.selectedFile);
    },

    deleteSelectedImage() {
      this.selectedImageUrl = null; // Clear the selected image URL
    },
    deleteSelectedFile() {
      this.selectedFile = null; // Clear the selected file
      this.selectedFileUrl = null; // Clear the file URL
    },
    handleSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
      const file = event.target.elements.img.files[0]; // Get the selected file
      event.target.reset();
    },
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    selectedCard() {
      const card = localStorage.getItem("card");
      const parsedObject = JSON.parse(card);
      console.log(parsedObject);
      return parsedObject;
    },
  },
};
</script>

<style>
.dropdown {
  display: flex;
}
.test {
  display: grid;
  justify-content: center;
  gap: 1em;
}
.sidebar {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0;
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
}
/* .btn-primary {
  height: 3em;
  margin: 7em !important;
  margin-left: 1em;
} */

/* The sidebar links */
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidebar a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* The button used to open the sidebar */
.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
  display: flex;
  margin-top: -30em;
  margin-left: -16px;
}

.openbtn:hover {
  background-color: #444;
}
ul {
  margin-top: 1.4em;
  margin-bottom: -11em;
  padding-top: 2em;
  color: aliceblue;
  font-size: medium;
  margin-left: -200px;
  display: grid;
  gap: 1em;
  margin-left: 0px;
  list-style: none;
  width: 2em;
}
.selectedFileUrl {
  width: 65em;
  height: 17em;
  margin-left: 14em;
  margin-top: -45em !important;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left 0.5s; /* If you want a transition effect */
  padding: 20px;
  padding-top: 6em;
  /* margin-left: -225px; */
}
.dropdown-item {
  border: solid red;
  padding: 2em;
}
.selected-image-container {
  /* display: flex;
    justify-content: flex-end;
    align-items: inherit;
    margin-top: 1em; */
  width: 20em;
  height: 20em;
  margin-left: 30em;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>
