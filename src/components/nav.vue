<template>
  <header class="navbar navbar-inverse">
  <nav class="navbar navbar-expand-lg" style="display: contents;">
  <div class="container-fluid temp" >
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">Analysis</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="testimonials">Testimonials</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about">About</a>
        </li>
        
      </ul>
      <div class="dropdown me-5">
    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
      data-bs-toggle="dropdown" aria-expanded="false">
      <span class="d-none d-sm-inline mx-1" style="margin: 2em;">Login/Signup</span>
    </a>
    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
      <li><a class="dropdown-item" href="#">Settings</a></li>
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" @click="logout">Log out</a></li>
    </ul>
  </div>
     
    </div>
  </div>
</nav>
</header>
</template>

<script>
export default {
  logout() {
      // Perform actions to log out the user
      // For example, clear session data or authentication tokens
      // and redirect to the login page
      // Here's an example using Vue Router's navigation method:
      this.redirectToLogin();
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
  
    name:'nav'
}
</script>

<style scope>

.temp{
  border-top: 2px solid yellow;
    border-bottom: 2px solid yellow;
    background: black;
    color: white;
    height: 5em;
}
.nav a.router-link-exact-active {
  color: rgb(26, 25, 25);
}
.nav-link{
  color: yellow;
}
.nav-link:hover{
  color: yellow;
}
.navbar-inverse{
  border: yellow;
  border-width: (5px 0 5px);
  width: 100%;
}
.me-5{
  margin: 1em;
  margin-left: 75em;
  display: flex;
}

</style>