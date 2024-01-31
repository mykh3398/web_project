<template>
    <div class="container mt-5">
        <h1>Guest Profile</h1>&nbsp;
        <div v-if="guest">
            <div>
                <h2>FullName: {{ guest.Last_Name + " " + guest.First_Name + " " + guest.Middle_Name }}</h2>&nbsp;
                <h2>Phone: {{ guest.Phone }}</h2>
                <h2>Birthday: {{ guest.Passport_Date }}</h2>&nbsp;
                <h2>Passport Number: {{ guest.Passport_Number }}</h2>&nbsp;
                <h2>Gender: {{ getGenderText(this.guest.Gender) }}</h2>
            </div>
            <router-link :to="{ name: 'guest-edit', params: { ID_Guest: guest.ID_Guest } }"
                class="btn btn-primary custom-margin">Edit</router-link>
            <button @click="deleteGuest" class="btn btn-primary custom-margins">Delete</button>&nbsp;

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            apiUrl: "http://localhost:3000/api",
            getGuestEndpoint: '/guests/',
            deleteGuestEndpoint: "delete/",
            guest: null
        };
    },
    mounted() {
        this.getGuest();
    },
    methods: {
        async getGuest() {
            try {
                const guestId = this.$route.params.ID_Guest;
                const response = await axios.get(this.apiUrl + this.getGuestEndpoint + guestId);
                this.guest = response.data;
                
            } catch (error) {
                console.error(error);
            }
        },

        async deleteGuest() {
            try {
                const guestId = this.$route.params.ID_Guest;
                const response = await axios.delete(this.apiUrl + this.getGuestEndpoint + this.deleteGuestEndpoint + guestId);
                if (response.status === 200) {
                    this.$router.push('/guests')
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

<style  scoped>
.custom-margin {
    margin-right: 10px;
}
</style>