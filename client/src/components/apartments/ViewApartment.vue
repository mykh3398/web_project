<template>
    <div>
        <div class="container mt-5">
            <h1>Apartment Details</h1>
            <div v-if="apartment">
                <div>
                    <h4>{{ getTypeNameById(apartment.ID_Ref_Apart_Class) }}</h4>
                    <p>{{ apartment.Description }}</p>&nbsp;
                    <h4>Apartment is on the {{ apartment.Floor }} floor
                        and its number is {{ apartment.Number_Of_Apartment }}</h4>
                    <h2>Price: {{ getPriceById(apartment.ID_Ref_Apart_Class) }} $</h2>

                </div>
                <router-link v-if="isAdmin" :to="{ name: 'apartment-edit', params: { ID_Apart: apartment.ID_Apart } }"
                    class="btn btn-primary mr-2">Edit</router-link>&nbsp;
                <div v-if="!isAdmin">
                    <router-link :to="{ name: 'booking-create', params: { ID_Apart: apartment.ID_Apart } }"
                        class="btn btn-outline-primary btn-hover ">Book</router-link> &nbsp;
                </div>


                <button v-if="isAdmin" @click="deleteApartment" class="btn btn-primary">Delete</button> &nbsp;


                <!-- <router-link to="{ name: 'apartment-edit', params: { ID_Apart: apartment.ID_Apart }}">Update</router-link> -->
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
            getApartmentEndpoint: '/apartments/',
            getApartmentClassesEndpoint: "/apartmentClass/classes",
            deleteApartmentEndpoint: "/apartments/delete/",
            apartmentTypes: [],
            apartment: null,
        };
    },
    mounted() {
        this.getApartment();
        this.getClasses();
    },
    computed: {
        ...mapGetters(['isAdmin', 'ID_Ref_Role'])
    },
    methods: {
        async getApartment() {
            try {
                const apartmentId = this.$route.params.ID_Apart;
                const response = await axios.get(this.apiUrl + this.getApartmentEndpoint + apartmentId);
                this.apartment = response.data;
                this.idApart = apartmentId

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
        async deleteApartment() {
            try {
                const apartmentId = this.$route.params.ID_Apart;
                const response = await axios.delete(this.apiUrl + this.deleteApartmentEndpoint + apartmentId);
                if (response.status === 200) {
                    this.$router.push('/apartments')
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
    },
};
</script>
  
