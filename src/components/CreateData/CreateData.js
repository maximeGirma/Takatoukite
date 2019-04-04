/* eslint-disable */

import MainButton from "../MainButton/index.vue";
import {Helpers} from "../../utils/Helpers";
import {Intervention} from "../../classes/Intervention";

const faker = require('faker')
faker.locale = 'fr'


export default {
    name: 'create-data',
    components: {
        MainButton

    },
    props: []
    ,
    data() {
        return {
            keysArray: {
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
            errorForm: null,
            data: {}
        }
    },
    computed: {},
    mounted() {
        let ref = ''
        for (let i = 0; i < 9; i++) {
            ref += faker.random.alphaNumeric()
        }
        this.data.reference = ref

    },
    methods: {
        confirmCreation() {
            console.log('in createModule')
            //this.data
            //this.keysArray

            let checkReponse = Intervention.isdatasValid(this.data,this.keysArray)
            if (checkReponse.status === true) {
                this.$root.$emit('confirmCreationEvent', this.data)
            } else {
                this.errorForm = checkReponse.message

            }
        },
        cancelCreation() {
            this.$emit('cancelCreationEvent', true)
        },
        dismissModal() {
            this.errorForm = null
        }
    }
}
