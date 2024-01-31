<template>
    <div>
        <div class="container mt-5">
            <h1>Bookings</h1>
            <div class="row">
                <div v-if="bookings.length === 0">There's no bookings</div>
                <div v-for="booking in bookings" :key="booking.ID_Booking" class="col-md-4 mb-4">
                    <div class="card" v-if="ID_User === booking.ID_Ref_User || userID === booking.ID_Ref_User">
                        <div class="card-body d-flex">
                            <div class="user-avatar align-self-start">
                                <i class="fa fa-calendar fa-3x"></i>
                            </div>
                            <div class="user-info ml-3">
                                <h2 class="card-title">Apartment: {{ booking.ID_Ref_Apart }}</h2>
                                <p class="card-text">startDate: {{ booking.Start_Date }}</p>
                                <p class="card-text">endDate: {{ booking.End_Date }}</p>
                                <!-- <p>{{  booking.ID_Ref_User }}]</p> -->
                                <router-link :to="'/booking/' + booking.ID_Booking">
                                    View
                                </router-link>
                            </div>
                        </div>
                    </div>
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
            getAllBookingsEndpoint: "/booking",
            getOneBookingEndpoint: "/booking/:ID_Booking",
            bookings: [],
            userID: null
        };
    },
    mounted() {
        this.getAllUserBookings();
    },
    computed: {
        ...mapGetters(['ID_User', 'isAdmin'])
    },

    methods: {
        async getAllUserBookings() {
            try {
                this.userID = this.$route.params.ID_User
                console.log(this.userID);
                const response = await axios.get(this.apiUrl + this.getAllBookingsEndpoint);
                this.bookings = response.data;
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