<template>
  <nav id="idNavigator" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/home">
        <img class="logo" src="../assets/hazbin_hotel_full.jpg" />
        <b class="navbar-brand" id="idBrand">Hazbin Hotel</b>
      </router-link>


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">


          <!--Contacts-->
          <li class="nav-item">
            <router-link to="/contacts" class="nav-link active" aria-current="page">Contacts</router-link>
          </li>

          <!--FAQ-->
          <li class="nav-item">
            <router-link to="/FAQ" class="nav-link active" aria-current="page">FAQ</router-link>
          </li>

          <!--Apartments-->
          <li class="nav-item" v-if="isAuthenticated && !isAdmin">
            <router-link to="/apartments" class="nav-link active" aria-current="page">
              <i class="fa-solid fa-building"></i>Apartments
            </router-link>
          </li>


        </ul>



        <ul class="nav justify-content-center">

          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/register" class="nav-link active" aria-current="page">
              <i class="fa-solid fa-user-plus"></i>Sign Up
            </router-link>
          </li>

          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="nav-link active" aria-current="page">
              <i class="fa-solid "></i>Sign In
            </router-link>
          </li>

          <li v-if="isAuthenticated" class="nav-item">
            <button class="nav-link" @click="logoutAndRedirect">
              <i class="fa-solid fa-sign-out"></i> Log Out
            </button>
          </li>
          
          <li v-if="isAuthenticated && !isAdmin" class="nav-item">
            <router-link :to="'/user/profile/' + this.ID_User" class="nav-link active" aria-current="page">
              <i class="fa-solid fa-user"></i>Profile
            </router-link>
          </li>

          <li v-if="isAuthenticated && isAdmin" class="nav-item">
            <router-link :to="'/admin/'" class="nav-link active" aria-current="page">
              <i class="fa-solid fa-lock"></i>Admin Panel
            </router-link>
          </li>

        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HeadNav',

  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin', 'ID_User']),
  },

  methods: {
    ...mapActions(['logout']),

    async logoutAndRedirect() {
      await this.logout();
      this.$router.push('/');
    },
  }

}
</script>

<style scoped>
i {
  cursor: pointer;
  margin: 5px
}

a {
  text-decoration: none;
}

.nav-link {
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
