<template>
    <div class="card authorization-data">

        <form class="needs-validation m-3" name="formSignUp" id="idFormSignUp" @input="(event) => formValidation(event)">

            <div class="mb-3">
                <label for="idPassport" class="form-label">Passport_Number*</label>
                <input type="passport" class="form-control" id="idPassport" name="passport" minlength="5" required
                    v-model="guest.Passport_Number" @change="checkValidation" @input="(event) => resetClassList(event)">
                <div class="invalid-feedback">
                    Please enter valid password (length must be over 4 symbols)
                </div>
            </div>

            <div class="mb-3">
                <label for="idLastName" class="form-label">Last Name*</label>
                <input type="text" class="form-control" id="idLastName" name="lastName"
                    pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]+$" required v-model="guest.Last_Name"
                    @change="checkValidation" @input="(event) => resetClassList(event)">
                <div class="invalid-feedback">
                    Please enter valid last name: does not contain numbers, first letter is uppercase, min 2 symbols
                </div>
            </div>

            <div class="mb-3">
                <label for="idFirstName" class="form-label">First Name*</label>
                <input type="text" class="form-control" id="idFirstName" name="firstName"
                    pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]*$" required v-model="guest.First_Name"
                    @change="checkValidation" @input="(event) => resetClassList(event)">
                <div class="invalid-feedback">
                    Please enter valid first name: does not contain numbers, first letter is uppercase
                </div>
            </div>

            <div class="mb-3">
                <label for="idMiddleName" class="form-label">Middle Name</label>
                <input type="text" class="form-control" id="idMiddleName" name="middleName"
                    pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]*$" v-model="guest.Middle_Name" @change="checkValidation"
                    @input="(event) => resetClassList(event)">
                <div class="invalid-feedback">
                    Please enter valid middle name: does not contain numbers, first letter is uppercase
                </div>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadioMan" v-model="guest.Gender"
                    value="1" required>
                <label class="form-check-label" for="flexRadioMan">
                    Man
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadioWoman" v-model="guest.Gender"
                    value="2" required>
                <label class="form-check-label" for="flexRadioWoman">
                    Woman
                </label>
                <div class="invalid-feedback">
                    Make choose
                </div>
            </div>

            <div class="mb-3">
                <label for="idBirthday" class="form-label">Passport_Date*</label>
                <input type="date" class="form-control item" id="idBirthday" name="birthday" pattern="\d{2}.\d{2}.\d{4}"
                    required :max="maxDate" v-model="guest.Passport_Date" @change="checkValidation"
                    @input="(event) => resetClassList(event)" />
                <div class="invalid-feedback">
                    Please enter valid birthday
                </div>
            </div>

            <div class="mb-3">
                <label for="idPhone" class="form-label">Phone number*</label>
                <input type="text" class="form-control" id="idPhone" name="phone" required placeholder="+38(0__) ___-__-__"
                    pattern="^\+38\(0\d{2}\)\s\d{3}[\-]\d{2}[\-]\d{2}$" v-model="guest.Phone" @change="checkValidation"
                    @input="(event) => resetClassList(event)">
                <div class="invalid-feedback">
                    Please enter phone number
                </div>
            </div>

            <button type="button" name="signUp" class="btn btn-primary" @click="updateGuest" disabled>
                Update Guest
            </button>&nbsp;
            <button type="button" name="cancel" class="btn btn-secondary" @click="(event) => onCancel(event)" disabled>
                Cancel
            </button>&nbsp;

            <div v-show="errorText" class="alert alert-danger" role="alert" style="margin-top: 30px">
                {{ errorText }}
            </div>
        </form>
    </div>
</template>
    
<script>
import axios from 'axios';
import Inputmask from 'inputmask';

export default {
    name: 'CreateGuest',
    data: () => ({
        maxDate: new Date().toISOString().split('T')[0],
        apiUrl: 'http://localhost:3000/api',
        updateGuestEndpoint: '/guests/update/',
        getGuestEndpoint: '/guests/',
        errorText: null,
        guest: {
            First_Name: '',
            Middle_Name: '',
            Last_Name: '',
            Passport_Number: '',
            Phone: '',
            Passport_Date: '',
            Gender: '',
        },
    }),

    mounted() {
        this.getGuest();
        this.getInitialData();

        const inputMaskPhone = new Inputmask('+38(099) 999-99-99');
        inputMaskPhone.mask(document.getElementById('idPhone'));
    },


    methods: {
        async getInitialData() {
            const initialData = await this.getGuest();
            if (initialData) {
                this.guest.First_Name = initialData.First_Name;
                this.guest.Last_Name = initialData.Last_Name;
                this.guest.Middle_Name = initialData.Middle_Name;
                this.guest.Phone = initialData.Phone;
                this.guest.Passport_Date = initialData.Credit_Card_Number;
                this.guest.Passport_Number = initialData.Birthday;
                this.guest.Gender = initialData.Gender;
            }
        },

        async getGuest() {
            try {
                const guestId = this.$route.params.ID_Guest;
                const response = await axios.get(this.apiUrl + this.getGuestEndpoint + guestId);
                this.guest = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async updateGuest() {
            try {
                const guestId = this.$route.params.ID_Guest;
                const response = await axios.put(this.apiUrl + this.updateGuestEndpoint + guestId, this.guest);
                if (response.status === 200) {
                    this.$router.push({ name: 'guest', params: { ID_Guest: guestId } });
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

        onCancel() {
            const guestId = this.$route.params.ID_Guest;
            this.$router.push('/guests/' + guestId);
        },

        dateFormat: (date) => `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`,
    }
}
</script>
    