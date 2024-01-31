<template>
    <div>
        <div class="container mt-5">
            <h1>Booking </h1>&nbsp;
            <div v-if="booking">
                <div>
                    <h2>ID Apartment: {{ booking.ID_Ref_Apart }}</h2>&nbsp;
                    <h2>Start Date: {{ booking.Start_Date }}</h2>
                    <h2>End Date: {{ booking.End_Date }}</h2>&nbsp;
                    <h2>Confirmed: {{ booking.Confirmed_Booking }}</h2>
                    <h2>Paid: {{ booking.Is_Paid }}</h2>&nbsp;

                </div>
                <!-- <router-link :to="{ name: 'Booking-edit', params: { ID_User: this.ID_User } }">Edit</router-link>&nbsp; -->
                
                <button @click="deleteBooking" class="btn btn-primary">Cancel Booking</button>&nbsp;
            </div>
        </div>
    </div>
</template>
      
<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            apiUrl: "http://localhost:3000/api",
            getBookingEndpoint: '/booking/',
            cancelBookingEndpoint: "delete/",
            booking: null
        };
    },
    mounted() {
        this.getBooking();
    },
    computed:{
        ...mapGetters(['ID_User']),
    },
    methods: {
        async getBooking() {
            try {
                const bookingId = this.$route.params.ID_Booking;
                const response = await axios.get(this.apiUrl + this.getBookingEndpoint + bookingId);
                this.booking = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        
        async deleteBooking() {
            try {
                const bookingId = this.$route.params.ID_Booking;
                const response = await axios.delete(this.apiUrl + this.getBookingEndpoint + this.cancelBookingEndpoint  + bookingId);
                if (response.status === 200) {
                    this.$router.go(-1);
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
    },
};
</script>

      