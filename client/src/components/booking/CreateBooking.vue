<!-- CreateBooking.vue -->
<template>
    <div class="container mt-5">
        <h2 class="mb-4">Create Booking</h2>
        <form @submit.prevent>
            <div class="mb-3">
                <label for="apartment" class="form-label">Apartment:</label>
                <span class="form-control" readonly>{{ this.$route.params.ID_Apart }}</span>
            </div>
            <div class="mb-3">
                    <label for="start-date" class="form-label">Start Date:</label>
                    <input type="date" id="start-date" class="form-control" v-model="booking.Start_Date" :min="minStartDate"
                        required @change="checkValidation" @input="(event) => resetClassList(event)" />
                    <div class="invalid-feedback">
                        Please enter valid start date
                    </div>
                </div>

                <div class="mb-3">
                    <label for="end-date" class="form-label">End Date:</label>
                    <input type="date" id="end-date" class="form-control" v-model="booking.End_Date"
                        :min="booking.Start_Date" required @change="checkValidation" @input="(event) => resetClassList(event)"/>
                    <div class="invalid-feedback">
                        Please enter valid end date
                    </div>
                </div>

            <button class="btn btn-primary mb-3" @click="createBooking">Create Booking</button>

        </form>
    </div>
</template>
  
  
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            booking: {
                ID_Ref_User: '',
                ID_Ref_Apart: '',
                Start_Date: '',
                End_Date: '',
                Confirmed_Booking: 1.2,
                Is_Paid: 1.2,
            },
        };
    },

    created() {
        this.booking.ID_Ref_Apart = this.$route.params.ID_Apart;
        this.booking.ID_Ref_User = this.ID_User;
    },

    computed: {
        ...mapGetters(['ID_User']),

        minStartDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            const day = today.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
    },

    methods: {
        async createBooking() {
            try {
                const response = await axios.post('http://localhost:3000/api/booking/create', this.booking);
                console.log('booking after POST:', this.booking);
                if (response.status === 200) {
                    this.booking = {
                        ID_Ref_User: '',
                        ID_Ref_Apart: '',
                        Start_Date: '',
                        End_Date: '',
                        Confirmed_Booking: '',
                        Is_Paid: ''
                    };
                    await this.$router.push('/apartments');
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
        checkValidation: (event) => {
            const node = event.currentTarget;
            if (!node.checkValidity()) {
                node.classList.remove('is-valid');
                node.classList.add('is-invalid');
            } else {
                node.classList.remove('is-invalid');
                node.classList.add('is-valid');
            }
        },

        resetClassList: (event) => {
            const node = event.currentTarget;
            if (node.classList.contains('is-valid') || node.classList.contains('is-invalid')) {
                node.classList.remove('is-valid', 'is-invalid');
            }
        },

        formValidation(event) {
            if (this.errorText) this.errorText = null;
            const form = event.currentTarget;
            form.signUp.disabled = !form.checkValidity();
            if (form.cancel.disabled) form.cancel.disabled = false;
        },

        onCancel(event) {
            if (this.errorText) this.errorText = null;
            const form = event.currentTarget.parentElement;
            form.signUp.disabled = true;
            form.cancel.disabled = true;
            const childNodes = document.querySelectorAll('input, select, textarea', form);
            Array.from(childNodes).forEach((node) => node.classList.remove('is-valid', 'is-invalid'));

            this.user = { ...this.pUser };
            if (this.user.Birthday) {
                const userBirthday = new Date(this.user.Birthday);
                this.user.Birthday =
                    `${userBirthday.getFullYear()}-${userBirthday.getMonth() < 9 ? '0' : ''}${userBirthday.getMonth() + 1}
          -${userBirthday.getDate() < 10 ? '0' : ''}${userBirthday.getDate()}`;
            }
        },
    },
};


</script>


  
