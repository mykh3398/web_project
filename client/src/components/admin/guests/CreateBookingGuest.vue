<template>
    <div>
        <div class="container">
            <h1>Creating booking for guest</h1>
            <form class="needs-validation m-3" name="formSignUp" id="idFormSignUp"
                @input="(event) => formValidation(event)">

                <div class="form-group">
                    <label for="floor">Guest</label>

                    <select class="form-control" v-model="booking.ID_Ref_Guest" required>
                        <option value=""></option>
                        <option v-for="guest in guests" :key="guest.ID_Guest" :value="guest.ID_Guest">
                            {{ guest.Last_Name + ' ' + guest.First_Name + ' | ' + guest.Phone }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="apartmentType">Apartment</label>
                    <select class="form-control" v-model="booking.ID_Ref_Apart" required>
                        <option value=""></option>
                        <option v-for="apart in apartments" :key="apart.ID_Apart" :value="apart.ID_Apart">
                            {{ apart.ID_Apart + ' | Floor: ' + apart.Floor + ' | '
                                + getTypeNameById(apart.ID_Ref_Apart_Class) + ' | Price: '
                                + getPriceById(apart.ID_Ref_Apart_Class) + '$' }}
                        </option>
                    </select>
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
                        :min="booking.Start_Date" required @change="checkValidation"
                        @input="(event) => resetClassList(event)" />
                    <div class="invalid-feedback">
                        Please enter valid end date
                    </div>
                </div>


                <button type="button" name="signUp" class="btn btn-primary mt-5 " @click="createBooking" disabled>
                    <i class="fa fa-building"></i> Create Booking
                </button>&nbsp;

                <button type="reset" name="cancel" class="btn btn-secondary mt-5" disabled>
                    Cancel
                </button>

            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';


export default {
    data: () => ({
        guests: [],
        apartments: [],
        apartmentTypes: [],
        booking: {
            ID_Ref_Guest: '',
            ID_Ref_Apart: '',
            Start_Date: '',
            End_Date: '',
            Confirmed_Booking: 1,
            Is_Paid: 1,
        },
        apiUrl: "http://localhost:3000/api",
        createBookingEndpoint: "/booking/createGuestBooking",
        getApartmentClassesEndpoint: "/apartmentClass/classes",
        getGuestsEndpoint: "/guests",
        getApartmentsEndpoint: "/booking/free",
    }),
    mounted() {
        this.getGuests();
        this.getApartments();
        this.getClasses();
    },

    computed: {
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
                const response = await axios.post(this.apiUrl + this.createBookingEndpoint, this.booking);
                if (response.status === 200) {
                    this.apart = { ID_Apart: '', ID_Ref_Guest: '', Start_Date: '', End_Date: '', Confirmed_Booking: '', Is_Paid: '' };
                    await this.$router.push('/bookings')
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

        async getApartments() {
            try {
                const response = await axios.get(this.apiUrl + this.getApartmentsEndpoint);
                if (response.status === 200) {
                    this.apartments.push(...response.data)
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

        async getGuests() {
            try {
                const response = await axios.get(this.apiUrl + this.getGuestsEndpoint);
                if (response.status === 200) {
                    this.guests.push(...response.data)
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

        async getClasses() {
            try {
                const response = await axios.get(this.apiUrl + this.getApartmentClassesEndpoint);
                if (response.status === 200) {
                    this.apartmentTypes.push(...response.data)
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
        getTypeNameById(id) {
            const type = this.apartmentTypes.find(type => type.ID_Apart_Class === id);
            return type ? type.Name : 'Unknown Type';
        },
        getPriceById(id) {
            const type = this.apartmentTypes.find(type => type.ID_Apart_Class === id);
            return type ? type.Price : 'Unknown Price';
        },

        onCancel(event) {
            if (this.errorText) this.errorText = null;
            const form = event.currentTarget.parentElement;
            form.signUp.disabled = true;
            form.cancel.disabled = true;
            const initialStartDate = this.booking.Start_Date;
            const initialEndDate = this.booking.End_Date;
            const childNodes = form.querySelectorAll('input, select, textarea');
            childNodes.forEach((node) => node.classList.remove('is-valid', 'is-invalid'));
            if (initialStartDate) {
                this.booking.Start_Date = new Date(initialStartDate).toISOString().split('T')[0];
            }
            if (initialEndDate) {
                this.booking.End_Date = new Date(initialEndDate).toISOString().split('T')[0];
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


    },
};
</script>

  