/* eslint-disable */

import MainButton from "../MainButton/index.vue";
import {Helpers} from "../../utils/Helpers";

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
            data: {

            }
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

        checkInputs() {
            let response = {status: true}
            let keysList = Helpers.getKeysFromObject(this.keysArray)
            console.log('lets go')
            for (let i = 0; i < keysList.length; i++) {
                console.log(this.data[keysList[i]])
                if (this.data[keysList[i]] === undefined) {
                    response = {
                        status: false,
                        message: this.keysArray[[keysList[i]]] + " n'est pas défini."
                    }
                    break
                }
            }
            return response
        },

        confirmCreation() {
            console.log('in createModule')
            let checkReponse = this.checkInputs(this.data)
            if (checkReponse.status === true) {
                this.$root.$emit('confirmCreationEvent', this.data)
            } else {
                this.errorForm = checkReponse.message

            }
        },
        cancelCreation() {
            this.$emit('cancelCreationEvent', true)
        },
        dismissModal(){
            this.errorForm = null
        }
    }
}
