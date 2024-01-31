<template>
  <div class="card authorization-data">

    <form class="needs-validation m-3" name="formSignUp" id="idFormSignUp" @input="(event) => formValidation(event)"
      @reset="formReset">

      <div class="mb-3">
        <label for="idEmail" class="form-label">Email address*</label>
        <input type="email" class="form-control" id="idEmail" name="email" placeholder="kk@example.com" required
          v-model="user.Email" @change="checkValidation" @input="(event) => resetClassList(event)">
        <!-- :readonly= "user.ID_User !== null" -->
        <div class="invalid-feedback">
          Please enter valid email
        </div>
      </div>

      <div class="mb-3">
        <label for="idPassword" class="form-label">Password*</label>
        <input type="password" class="form-control" id="idPassword" name="password" minlength="5" required
          v-model="user.Password" @change="checkValidation" @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter valid password (length must be over 4 symbols)
        </div>
      </div>

      <div class="mb-3">
        <label for="idLastName" class="form-label">Last Name*</label>
        <input type="text" class="form-control" id="idLastName" name="lastName"
          pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]+$" required v-model="user.Last_Name" @change="checkValidation"
          @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter valid last name: does not contain numbers, first letter is uppercase, min 2 symbols
        </div>
      </div>

      <div class="mb-3">
        <label for="idFirstName" class="form-label">First Name*</label>
        <input type="text" class="form-control" id="idFirstName" name="firstName"
          pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]*$" required v-model="user.First_Name" @change="checkValidation"
          @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter valid first name: does not contain numbers, first letter is uppercase
        </div>
      </div>

      <div class="mb-3">
        <label for="idMiddleName" class="form-label">Middle Name</label>
        <input type="text" class="form-control" id="idMiddleName" name="middleName"
          pattern="^[A-ZА-ЯЄЇІ][A-Za-zА-Яа-яЄєЇїІі\s]*$" v-model="user.Middle_Name" @change="checkValidation"
          @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter valid middle name: does not contain numbers, first letter is uppercase
        </div>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadio" id="flexRadioMan" v-model="user.Gender" value="1"
          required>
        <label class="form-check-label" for="flexRadioMan">
          Man
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadio" id="flexRadioWoman" v-model="user.Gender" value="2"
          required>
        <label class="form-check-label" for="flexRadioWoman">
          Woman
        </label>
        <div class="invalid-feedback">
          Make choose
        </div>
      </div>

      <div class="mb-3">
        <label for="idBirthday" class="form-label">Birthday*</label>
        <input type="date" class="form-control item" id="idBirthday" name="birthday" pattern="\d{2}.\d{2}.\d{4}" required
          :max="maxDate" v-model="user.Birthday" @change="checkValidation" @input="(event) => resetClassList(event)" />
        <div class="invalid-feedback">
          Please enter valid birthday
        </div>
      </div>

      <div class="mb-3">
        <label for="idPhone" class="form-label">Phone number*</label>
        <input type="text" class="form-control" id="idPhone" name="phone" required placeholder="+38(0__) ___-__-__"
          pattern="^\+38\(0\d{2}\)\s\d{3}[\-]\d{2}[\-]\d{2}$" v-model="user.Phone" @change="checkValidation"
          @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter phone number
        </div>
      </div>

      <div class="mb-3">
        <label for="idCreditCardNumber" class="form-label">Card Number</label>
        <input type="text" class="form-control" id="idCreditCardNumber" name="creditCardNumber"
          placeholder="____-____-____-____" pattern="^\d{4}[\-]\d{4}[\-]\d{4}[\-]\d{4}$" v-model="user.Credit_Card_Number"
          @change="checkValidation" @input="(event) => resetClassList(event)">
        <div class="invalid-feedback">
          Please enter correct card number
        </div>
      </div>

      <div class="mb-3">
        <label for="idGroup" class="form-label">Blood Type</label>
        <select class="form-control" id="idGroup" name="group" v-model="user.Blood_Type">
          <option></option>
          <option>O(I)</option>
          <option>A(II)</option>
          <option>B(III)</option>
          <option>AB(IV)</option>
        </select>
        <div class="invalid-feedback">
          Please select group
        </div>
      </div>

      <button type="button" name="signUp" class="btn btn-primary" @click="onSignUp" disabled>
        Sign Up
      </button>&nbsp;
      <button type="button" name="cancel" class="btn btn-secondary" @click="(event) => onCancel(event)" disabled>
        Cancel
      </button>&nbsp;

      <button type="button" name="signIn" class="btn btn-link">
        <router-link to="/login">
          Sign In
        </router-link>
      </button>

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
  name: 'SignUpUser',
  mounted() {
    const inputMaskPhone = new Inputmask('+38(099) 999-99-99');
    inputMaskPhone.mask(document.getElementById('idPhone'));

    const inputMaskCardNumber = new Inputmask('9999-9999-9999-9999');
    inputMaskCardNumber.mask(document.getElementById('idCreditCardNumber'));
  },


  data: () => ({
    maxDate: new Date().toISOString().split('T')[0],
    apiUrl: 'http://localhost:3000/api',
    registrationEndpoint: '/registration',
    errorText: null,
    user: {
      First_Name: '',
      Middle_Name: '',
      Last_Name: '',
      Email: '',
      Password: '',
      Phone: '',
      Credit_Card_Number: '',
      Blood_Type: '',
      Birthday: '',
      Gender: '',
      ID_Ref_Role: 2
    },
    token: null
  }),


  methods: {

    async onSignUp() {
      try {
        console.log('before post');
        const response = await axios.post(this.apiUrl + this.registrationEndpoint, this.user);
        console.log('after post');
        if (response.status === 200 && response.data) {
          console.log('in if');
          this.user = {
            First_Name: '', Middle_Name: '', Last_Name: '',
            Email: '', Password: '', Phone: '', Credit_Card_Number: '', Blood_Type: '',
            Birthday: '', Gender: '', ID_Ref_Role: ''
          };
          console.log('before login');
          await this.$router.push('/login');
        } else {
          console.error('Invalid response:', response);
          throw new Error('Invalid response');
        }
      } catch (error) {
        console.error('Error during sign up:', error);
        if (error.response && error.response.status) {
          this.errorText = error.response.data;
        } else {
          this.errorText = 'An unexpected error occurred.';
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
      if (this.user.Birthday) {
        const userBirthday = new Date(this.user.Birthday);
        this.user.Birthday =
          `${userBirthday.getFullYear()}-${userBirthday.getMonth() < 9 ? '0' : ''}${userBirthday.getMonth() + 1}
          -${userBirthday.getDate() < 10 ? '0' : ''}${userBirthday.getDate()}`;
      }
    },

    formReset(event) {
      if (this.errorText) this.errorText = null;

      const form = event.currentTarget;

      form.signIn.disabled = true;
      form.cancel.disabled = true;

      const childNodes = document.querySelectorAll("input", form);
      Array.from(childNodes).forEach((node) => node.classList.remove('is-valid', 'is-invalid'));
    },

    //dateFormat: (date) => `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`,
  }
}
</script>
  