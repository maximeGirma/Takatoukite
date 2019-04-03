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

            // let address = this.data.address
            // let city = this.data.city
            // let zip = this.data.zip
            // let technicianFirstName = this.data.technicianFirstName
            // let technicianLastName = this.data.technicianLastName
            // let telephoneNumber = this.data.telephoneNumber
            // let type = this.data.type
            // let price = this.data.price
            // let status = this.data.status

            if(this.data.startDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/) === null){
                return {
                    status: false,
                    message: "Le format de la date de début est invalide. Le format correct est AAAA-MM-JJ."
                }
            }
            if(this.data.endDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/) === null){
                return {
                    status: false,
                    message: "Le format de la date de retour est invalide. Le format correct est AAAA-MM-JJ."
                }
            }

            if( this.data.zip.match("^(([0-8][0-9])|(9[0-5]))[0-9]{3}$") === null) {

                 return {
                     status: false,
                     message: "Le code postal doit être un code postal valide, exemple : 33000"
                 }
             }

            if (this.data.telephoneNumber.match("^((\\+)33|0|0033)[1-9](\\d{2}){4}$") === null) {
                return {
                    status: false,
                    message: "Le numéro de téléphone est incorrect, exemple : 0677676767"
                }
            }
            let types= [
                'Installation',
                'Maintenance',
                'Formation',
                'Dépannage'
            ]
            if (types.indexOf(this.data.type) === -1){
                let typesString = ''
                typesString += types.map((type)=>{
                    return type
                })
                return {
                    status: false,
                    message: "Le type d'intervention doit être l'un des types suivants : " + typesString
                }
            }

            console.log('tetetetetet')

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
        dismissModal() {
            this.errorForm = null
        }
    }
}
