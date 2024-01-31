<template>
  <div>
    <div class="container mt-5">
      <h1>Список користувачів</h1>

      <div class="row">
        <div v-for="user in users" :key="user.ID_User" class="col-md-4 mb-4">
          <div v-if="users.length === 0">There's no users</div>
          <div class="card">
            <div class="card-body d-flex">
              <div class="user-avatar align-self-start">
                <i class="fa fa-user fa-3x"></i>
              </div>
              <div class="user-info ml-3">
                <h2 class="card-title">{{ user.Last_Name }}</h2>
                <h2 class="card-title">{{ user.First_Name }}</h2>
                <p class="card-text">Email: {{ user.Email }}</p>
              </div>
              <router-link :to="'/user/profile/' + user.ID_User">
                View
              </router-link>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      apiUrl: "http://localhost:3000/api",
      getAllUsersEndpoint: "/users",
      users: [],
    };
  },
  mounted() {
    this.getAllUsers();
  },

  methods: {
    async getAllUsers() {
      try {
        const response = await axios.get(this.apiUrl + this.getAllUsersEndpoint);
        this.users = response.data;
      } catch (error) {
        if (error.response && error.response.status) {
          this.errorText = error.response.data;
        } else {
          this.errorText = error.message;
        }
      }
    },

  },
};
</script>

<style scoped>
.user-avatar {
  flex: 0 0 auto;
  align-self: flex-start;
}

.user-info {
  flex: 1;
  max-width: calc(100% - 50px);
}
</style>