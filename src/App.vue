<template>
    <div id="app" >

        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <p>Interventions manager</p>
        <DataList
                v-if="!interventionDetails"
                :interventionsList="interventionsList"
                :labels="labels"
                @setDetailsIntervention="setDetailsIntervention"
                @updateIntervention="updateIntervention"
        />

        <Details
                v-else
                :details="interventionDetails"
                @updateIntervention="updateIntervention"
                @goBack="setDetailsIntervention"
        />
    </div>
</template>

<script>
    import DataList from "./components/DataList/index.vue";
    import {Service} from "../service/Service";
    import {InterventionsList} from "./classes/InterventionsList";
    import Details from "./components/Details/index.vue";

    const interventionsData = new InterventionsList(Service.getInterventions())

    export default {
        name: 'app',
        components: {
            DataList,
            Details
        },
        data() {
            return {
                interventionsList: interventionsData.getAbstractInterventions(),
                interventionDetails: null,
                labels: {
                    reference: 'Reference',
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
            this.$root.$on('confirmCreationEvent', (data)=>{
                console.log('event root in App.vue trigered', data)
                interventionsData.addIntervention(data)
            })
        },
        methods: {
            testinou(reference) {
                alert('deleting...')
                Service.deleteIntervention(reference)
            },
            updateIntervention(interventionToEdit) {
                console.log('in the parent')
                console.log(this.interventionsList)
                console.log(interventionToEdit.city)
                interventionsData.updateIntervention(interventionToEdit)

                // for (let i = 0; i < this.interventionsList.length; i++) {
                //     if (this.interventionsList[i].reference === interventionToEdit.reference) {
                //         this.$set(this.interventionsList, i, interventionToEdit)
                //         break
                //     }
                // }
                this.refreshInterventions()
            },

            setDetailsIntervention(reference) {
                console.log('in app.vue')
                console.log(reference)
                // this.$set(this.interventionDetails, 0,  new InterventionsList(rawData).getFullIntervention(reference))

                this.interventionDetails = interventionsData.getFullIntervention(reference)

            },
            refreshInterventions() {
                let freshData = interventionsData.getAbstractInterventions()
                freshData.map((value, index)=>{
                    this.$set(this.interventionsList, index, value)
                })
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
