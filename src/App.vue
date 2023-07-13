<template>
  <navbar />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/testimonials">Testimonials</router-link>
  </nav> -->

  <router-view/>
</template>
<script>
import navbar from './components/nav.vue'
import Editpage from './components/Editpage.vue';
export default {
  components:{
    navbar,
    Editpage
  }
  
}
</script>

<style setup>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
