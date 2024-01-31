<template>
    <div>
        <div class="container">
            <h1>Edit apartment</h1>
            <form class="needs-validation m-3" name="formSignUp" id="idFormSignUp"
                @input="(event) => formValidation(event)">
                <div class="form-group">
                    <label for="floor">Floor</label>
                    <select class="form-control" id="idGroup" name="group" v-model="apart.Floor">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="number">Number</label>
                    <input type="text" id="idNumber" class="form-control" v-model="apart.Number_Of_Apartment" min="1"
                        required />
                </div>

                <div class="form-group">
                    <label for="apartmentType">Тип номеру</label>
                    <select class="form-control" v-model="apart.ID_Ref_Apart_Class" required>
                        <option v-for="type in apartmentTypes" :key="type.ID_Apart_Class" :value="type.ID_Apart_Class">
                            {{ type.Name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="input">Опис номеру</label>
                    <textarea class="form-control" v-model="apart.Description" placeholder="description"
                        required></textarea>
                </div>



                <button type="button" name="signUp" class="btn btn-primary mt-5 " @click="updateApartment" disabled>
                    <i class="fa fa-building"></i> Update Apartment
                </button>&nbsp;

                <button type="button" name="cancel" class="btn btn-secondary  mt-5 " @click="onCancel" disabled>
                    Cancel
                </button>&nbsp;
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Inputmask from 'inputmask';

export default {
    data: () => ({
        apart: {
            ID_Apart: '',
            Floor: '',
            Number_Of_Apartment: '',
            ID_Ref_Apart_Class: '',
            Description: ''
        },
        apartmentTypes: [],
        apiUrl: 'http://localhost:3000/api',
        updateApartmentEndpoint: '/apartments/update/',
        getApartmentEndpoint: '/apartments/',
        getApartmentClassesEndpoint: '/apartmentClass/classes',
    }),

    mounted() {
        this.getClasses();
        this.getApartment();
        this.getInitialData();
        const inputMaskNumber = new Inputmask({
            mask: '9',
            repeat: 10,
            greedy: false,
            placeholder: '',
        });
        inputMaskNumber.mask(document.getElementById('idNumber'));

    },

    methods: {
        async getInitialData() {
            const initialData = await this.getApartment();
            if (initialData) {
                this.apart.Floor = initialData.Floor;
                this.apart.Number_Of_Apartment = initialData.Number_Of_Apartment;
                this.apart.ID_Ref_Apart_Class = initialData.ID_Ref_Apart_Class;
                this.apart.Description = initialData.Description;
            }
        },

        async getApartment() {
            try {
                const apartmentId = this.$route.params.ID_Apart;
                const response = await axios.get(this.apiUrl + this.getApartmentEndpoint + apartmentId);
                this.apart = response.data;
            } catch (error) {
                console.error(error);
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
        async updateApartment() {
            try {
                const apartmentId = this.$route.params.ID_Apart;
                const response = await axios.put(this.apiUrl + this.updateApartmentEndpoint + apartmentId, this.apart);
                if (response.status === 200) {
                    this.$router.push({ name: 'apartment', params: { ID_Apart: apartmentId } });
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

        onCancel() {
            const apartmentId = this.$route.params.ID_Apart;
            this.$router.push('/apartments/' + apartmentId);
        },

        navigateBack() {
            this.$router.go(-1);
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

<style scoped></style>
  