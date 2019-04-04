import {Helpers} from "../../utils/Helpers";
import MainButton from "../MainButton/index.vue";
import {Intervention} from "../../classes/Intervention";

export default {
    name: 'details',
    components: {
        MainButton
    },
    props: ['details']
    ,
    data() {
        return {
            mDetails: this.details,
            headerArray: {
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
            },
            errorForm:null,
            editMode: false,
        }
    },
    computed: {},
    mounted() {
        console.log(this.details)
        console.log(this.mDetails)
    },
    methods: {
        toggleEditMode(mode) {
            this.editMode = mode
            if(!mode){
                this.mDetails = this.details
            }
        },

        askForDeletion(reference){
            // this.displayAlert = true
            // this.selectedRef = reference
            // this.$root.$emit('confirmDeletion', 'toto')
            //
            //
            // this.$root.$on('confirmDeletion', () => {
            //     for (let i = 0; i < this.interventionsList.length; i++) {
            //         if (this.interventionsList[i].reference === this.selectedRef) {
            //             this.interventionsList.splice(i, 1)
            //             break
            //         }
            //     }
            //     this.displayAlert = false
            // })
        },

        validateChanges() {
            let isValid = Intervention.isdatasValid(this.mDetails,this.headerArray)
            if(isValid.status === true) {
                this.$emit('updateIntervention', this.mDetails)
                this.editMode = false
            } else {
                this.errorForm = isValid.message
            }

        },

        goBack() {
            this.$emit('goBack')
        }

    }
}
