<template>
    <div>
        <div class="container mt-5">
            <h1>User Profile</h1>&nbsp;
            <div v-if="user">
                <div>
                    <h2>FullName: {{ user.Last_Name + " " + user.First_Name + " " + user.Middle_Name }}</h2>&nbsp;
                    <h2>Email: {{ user.Email }}</h2>&nbsp;
                    <h2>Phone: {{ user.Phone }}</h2>
                    <h2>Birthday: {{ user.Birthday }}</h2>&nbsp;
                    <h2>Gender: {{ getGenderText(this.user.Gender) }}</h2>
                    <h2>BloodType: {{ user.Blood_Type }}</h2>

                </div>
                <div v-if="user.ID_Ref_Role !== 1">
                    <router-link v-if="!isAdmin" :to="{ name: 'user-edit', params: { ID_User: user.ID_User } }"
                    class="btn btn-primary custom-margin">Edit</router-link>

                    <router-link :to="{ name: 'bookingsUser', params: { ID_User: user.ID_User }}" class="btn btn-primary">
                        <div v-if="isAdmin">
                            User bookings
                        </div>
                        <div v-if="!isAdmin">
                            My bookings
                        </div>
                    </router-link>

                    <button v-if="isAdmin" @click="deleteUser" class="btn btn-primary btn-outline  ms-2">Delete</button>


                </div>


            </div>
        </div>
    </div>
</template>
      
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            apiUrl: "http://localhost:3000/api",
            getUserEndpoint: '/user/',
            deleteUserEndpoint: "/delete/user/",
            user: null,
            userId: null
        };
    },
    mounted() {
        this.getUser();
    },
    computed: {
        ...mapGetters(['isAdmin', 'ID_Ref_Role'])
    },
    methods: {

        async getUser() {
            try {
                this.userId = this.$route.params.ID_User;
                const userId = this.$route.params.ID_User;
                const response = await axios.get(this.apiUrl + this.getUserEndpoint + userId);
                this.user = response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async deleteUser() {
            try {
                const userId = this.$route.params.ID_User;
                const response = await axios.delete(this.apiUrl + this.getUserEndpoint + userId);
                if (response.status === 200) {
                    this.$router.push('/users')
                } else {
                    throw new Error(response.statusText || response.status);
                }
            } catch (error) {
                if (error.response && error.response.status) {
                    this.errorText = error.response.data;
                } else {
                    this.errorText = error.message;
                }
            }
        },
        getGenderText(gender) {
            if (gender === "1") {
                return "Man";
            } else if (gender === "2") {
                return "Woman";
            } else {
                return "Unknown";
            }
        },
    },
};
</script>

<style>
.custom-margin {
    margin-right: 10px; 
}

</style>

      