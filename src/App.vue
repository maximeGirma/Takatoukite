<template>
    <div id="app">

        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <DataList :interventionsList="interventionsList" :labels="labels" @updateIntervention="updateIntervention" @setDetailsIntervention="setDetailsIntervention"/>
    </div>
</template>

<script>
    import DataList from "./components/DataList/index.vue";
    import {Service} from "../service/Service";
    import {InterventionsList} from "./classes/InterventionsList";

    const rawData = Service.getInterventions()

    export default {
        name: 'app',
        components: {
            DataList
        },
        data() {
            return {
                interventionsList: new InterventionsList(rawData).getAbstractInterventions(),
                interventionDetails: 'mais',
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

        },
        methods:{
            testinou(reference){
                alert('deleting...')
                Service.deleteIntervention(reference)
            },
            updateIntervention(interventionToEdit){
                console.log('in the parent')
                console.log(this.interventionsList)
                for (let i = 0; i < this.interventionsList.length; i++){
                    if (this.interventionsList[i].reference === interventionToEdit.reference){
                           this.$set(this.interventionsList, i, interventionToEdit)
                        break
                    }
                }
            },
            setDetailsIntervention(reference){
                console.log('in app.vue')
                console.log(reference)
                // this.$set(this.interventionDetails, 0,  new InterventionsList(rawData).getFullIntervention(reference))
                console.log(new InterventionsList(rawData).getFullIntervention(reference))
                this.interventionDetails = new InterventionsList(rawData).getFullIntervention(reference)

                }
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
