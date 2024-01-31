<template>
  <div>
    <div class="container mt-5">

      <h1>Guests</h1>
      <router-link to="/guests/create">Create</router-link>
      <div class="row">
        <div v-for="guest in guests" :key="guest.ID_Guest" class="col-md-4 mb-4">
          <div v-if="this.guests.length === 0">There's no users</div>
          <div class="card">
            <div class="card-body d-flex">
              <div class="user-avatar align-self-start">
                <i class="fa fa-user fa-3x"></i> 
              </div>
              <div class="user-info ml-3">
                <h2 class="card-title">{{ guest.Last_Name }}</h2>
                <h2 class="card-title">{{ guest.First_Name }}</h2>
                <p class="card-text">Phone: {{ guest.Phone }}</p>
              </div>
              <router-link :to="'/guests/' + guest.ID_Guest">
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
      getAllGuestsEndpoint: "/guests",
      guests: [],
    };
  },
  mounted() {
    this.getAllGuests();
  },

  methods: {
    async getAllGuests() {
      try {
        const response = await axios.get(this.apiUrl + this.getAllGuestsEndpoint);
        this.guests = response.data;
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