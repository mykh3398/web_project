<template>
    <div>
        <div class="container mt-5">
            <h1>Bookings</h1>
            <router-link to="/bookingGuest/create" class="mb-2">Create</router-link> 
            <div class="row">
                <div v-for="booking in bookings" :key="booking.ID_Booking" class="col-md-4 mb-4">
                    <div v-if="bookings.length === 0">There's no users</div>
                    <div class="card">
                        <div class="card-body d-flex">
                            <div class="user-avatar align-self-start">
                                <i class="fa fa-calendar fa-3x"></i> 
                            </div>
                            <div class="user-info ml-3">
                                <!-- <h2 class="card-title">{{ getUserNameById(booking.ID_Ref_User) }}</h2> -->
                                <h2 class="card-title">Apartment: {{ booking.ID_Ref_Apart }}</h2>
                                <p class="card-text">startDate: {{ booking.Start_Date }}</p>
                                <p class="card-text">endDate: {{ booking.End_Date }}</p>
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

export default {
    data() {
        return {
            apiUrl: "http://localhost:3000/api",
            getAllBookingsEndpoint: "/booking",
            getOneBookingEndpoint: "/booking/:ID_Booking",
            bookings: [],
        };
    },
    mounted() {
        this.getAllBookings();
    },

    methods: {
        async getAllBookings() {
            try {
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