<template>
 <!-- <navbar /> -->
 <login /> 
</template>

<script>

// @ is an alias to /src
import login from '../components/login.vue'
import Demo from '@/components/Demo.vue';
// import navbar from "../components/nav.vue"


export default {
  components:{
    login,
    Demo
  }
  
}
</script>

<style scope>
body{
background: url('../assets/bg2.jpg') no-repeat center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
