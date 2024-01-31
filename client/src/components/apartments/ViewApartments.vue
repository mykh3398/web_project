<template>
    <div>
        <div class="container mt-5">
            <h1>Apartments</h1>
            <div v-if="isAdmin">
                <router-link to="/apartments/create">Create</router-link>
            </div>
            

                <div v-if="apartments.length === 0">Немає наявних приміщень.</div>
                <div v-if="isAdmin">
                    <div class="row">
                        <div v-for="apart in apartments" :key="apart.ID_Apart" class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body d-flex">
                                    <div class="user-avatar align-self-start">
                                        <i class="fa fa-building fa-3x"></i>
                                    </div>
                                    <div class="user-info ml-3">
                                        <router-link :to="'/apartments/' + apart.ID_Apart">
                                            {{ getTypeNameById(apart.ID_Ref_Apart_Class) }},
                                        </router-link>&nbsp;
                                        <h3>{{ getPriceById(apart.ID_Ref_Apart_Class) }} $</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div v-if="!isAdmin">
                    <div class="row">
                        <div v-for="apart in freeApartments" :key="apart.ID_Apart" class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body d-flex">
                                    <div class="user-avatar align-self-start">
                                        <i class="fa fa-building fa-3x"></i>
                                    </div>
                                    <div class="user-info ml-3">
                                        <router-link :to="'/apartments/' + apart.ID_Apart">
                                            {{ getTypeNameById(apart.ID_Ref_Apart_Class) }},
                                        </router-link>&nbsp;
                                        <h3>{{ getPriceById(apart.ID_Ref_Apart_Class) }} $</h3>
                                    </div>
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
            getAllApartmentsEndpoint: "/apartments/all",
            getAllFreeApartmentsEndpoint: "/booking/free",
            getApartmentClassesEndpoint: "/apartmentClass/classes",
            apartmentTypes: [],
            apartments: [],
            freeApartments: []
        };
    },
    mounted() {
        this.getAllApartments();
        this.getAllFreeApartments()
        this.getClasses();
    },
    computed: {
        ...mapGetters(['isAdmin'])
    },

    methods: {
        async getAllApartments() {
            try {
                const response = await axios.get(this.apiUrl + this.getAllApartmentsEndpoint);
                this.apartments = response.data;
                this.apartments.forEach(element => {
                    { element.ID_Apart }
                });
            } catch (error) {
                if (error.response && error.response.status) {
                    this.errorText = error.response.data;
                } else {
                    this.errorText = error.message;
                }
            }
        },

        async getAllFreeApartments() {
            try {
                const response = await axios.get(this.apiUrl + this.getAllFreeApartmentsEndpoint);
                this.freeApartments = response.data;
                this.freeApartments.forEach(element => {
                    { element.ID_Apart }
                });
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
    },
};
</script>
  
<style scoped>
.user-avatar {
    width: 30px;

}

.user-info {
    flex: 1;
    padding-left: 10px;

}
</style>
