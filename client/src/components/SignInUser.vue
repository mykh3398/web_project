<template>
  <div class="card authorization-data">
    <div class="card-header">
      Sign In data
    </div>

    <form class="needs-validation m-3" name="formSignIn" id="idFormSignIn" @input="formValidation" @reset="formReset">

      <div class="mb-3">
        <label for="idEmail" class="form-label">Email address*</label>
        <input type="email" class="form-control" id="idEmail" name="Email" placeholder="kk@example.com" required
          v-model="user.Email" @change="checkValidation" @input="resetClassList">
        <div class="invalid-feedback">
          Please enter a valid email
        </div>
      </div>

      <div class="mb-3">
        <label for="idPassword" class="form-label">Password*</label>
        <input type="password" class="form-control" id="idPassword" name="Password" minlength="5" required
          autocomplete="off" v-model="user.Password" @change="checkValidation" @input="resetClassList">
        <div class="invalid-feedback">
          Please enter a valid password (length must be over 4 characters)
        </div>
      </div>

      <button type="button" name="signIn" class="btn btn-primary" :disabled="!isFormValid" @click="handleLogin">
        Sign In
      </button>
      &nbsp;
      <button type="reset" name="cancel" class="btn btn-secondary" :disabled="!isFormValid">
        Cancel
      </button>
      &nbsp;
      <button type="button" name="signUp" class="btn btn-link">
        <router-link to="/register">
          Sign Up
        </router-link>
      </button>



      <div v-show="errorText" class="alert alert-danger" role="alert" style="margin-top: 30px">
        {{ errorText }}
      </div>

    </form>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignInUser',
  props: {},
  data() {
    return {
      errorText: null,
      user: { Email: null, Password: null },
      token: null,
    };
  },

  mounted() {
    console.log('Auth state:', this.$store.state.auth);
    console.log('Is authenticated:', this.isAuthenticated);
    console.log('Is admin:', this.isAdmin);
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin']),
  },
  
  methods: {
    ...mapActions(['login']),
    
    async handleLogin() {
      try {
        const success = await this.login({ Email: this.user.Email, Password: this.user.Password });
        if (success) {
          console.log('User logged in successfully');
          this.$router.push('/');
        } else {
          this.errorText = 'Invalid email or password';
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    },

  isFormValid() {
    const form = document.getElementById('idFormSignIn');
    return form ? form.checkValidity() : false;
  },

  checkValidation(event) {
    const node = event.currentTarget;

    if (!node.checkValidity()) {
      node.classList.remove('is-valid');
      node.classList.add('is-invalid');
    } else {
      node.classList.remove('is-invalid');
      node.classList.add('is-valid');
    }
  },

  resetClassList(event) {
    const node = event.currentTarget;

    if (node.classList.contains('is-valid') || node.classList.contains('is-invalid')) {
      node.classList.remove('is-valid', 'is-invalid');
    }
  },

  formValidation(event) {
    if (this.errorText) this.errorText = null;

    const form = event.currentTarget;

    form.signIn.disabled = !form.checkValidity();

    if (form.cancel.disabled) form.cancel.disabled = false;
  },

  formReset(event) {
    if (this.errorText) this.errorText = null;

    const form = event.currentTarget;

    form.signIn.disabled = true;
    form.cancel.disabled = true;

    const childNodes = document.querySelectorAll("input", form);
    Array.from(childNodes).forEach((node) => node.classList.remove('is-valid', 'is-invalid'));
  },
}
}
</script>
