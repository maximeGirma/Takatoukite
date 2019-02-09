<template>
    <div id="app" style="background-color: #0b76cc">

        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <DataList :interventionsList="interventionsList" :labels="labels"/>
    </div>
</template>

<script>
    import DataList from "./components/DataList/index.vue";
    import {Service} from "../service/Service";
    import {InterventionsList} from "./classes/InterventionsList";

    export default {
        name: 'app',
        components: {
            DataList
        },
        data() {
            return {
                interventionsList: new InterventionsList(Service.getInterventions()).getAbstractInterventions(),
                labels: {
                    reference: 'Ref',
                    startDate: 'Date début',
                    endDate: 'Date fin',
                    address: 'Adresse',
                    city: 'Ville',
                    zip: 'Code postal',
                    technicianFirstName: 'Prénom technicien',
                    technicianLastName: 'Nom technicien',
                    telephoneNumber: 'Télephone technicien',
                    type: 'Type',
                    price: 'Prix',
                    status: 'Status',
                }
            }
        },
        mounted() {
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
