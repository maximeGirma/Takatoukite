/* eslint-disable */
import {Helpers} from "../../utils/Helpers";
import {FILTER, ORDER} from "../../enums/DataListEnum";
import AlertModal from "../AlertModal/index.vue";
import PageSelector from "../PageSelector/index.vue";
import CreateData from "../CreateData/index.vue";
import MainButton from "../MainButton/index.vue";

export default {
    name: 'data-list',
    components: {
        AlertModal,
        PageSelector,
        CreateData,
        MainButton,

    },
    props: ['interventionsList', 'labels']
    ,
    data() {
        return {
            headerArray: Helpers.getKeysFromObject(this.interventionsList[0]),
            interventions: this.interventionsList,
            filter: FILTER.NONE,
            order: ORDER.DEFAULT,
            lastColumnClicked: null,
            reverse: false,
            page: 0,
            numberPerPage: 5,
            dataLength: this.interventionsList.length,
            searchFields: [],
            displayAlert: false,
            selectedRef: null,
            interventionToEdit: {reference: null},
            fieldToEdit:null,
            createMode: false
        }
    },
    computed: {
        filteredInterventions() {

            let dataToDisplay
            console.log('juste avant le if')
            if ((!Helpers.isElementsInArrayEmpty(Helpers.getArrayFromObject(this.searchFields)))) {
                // this.page = 0
                console.log('MOI AUSSI ! ! ! ! !! ')
                let searchedInterventions = []
                for (let i = 0; i < this.interventionsList.length; i++) {
                    let interventionAsArray = Helpers.getArrayFromObject(this.interventionsList[i])
                    let shouldReturnIntervention = true
                    for (let a = 0; a < interventionAsArray.length; a++) {
                        if (!interventionAsArray[a].includes(this.searchFields[a])) {
                            shouldReturnIntervention = false
                        }
                    }
                    if (shouldReturnIntervention) {
                        searchedInterventions.push(this.interventionsList[i])
                    }
                }
                dataToDisplay = searchedInterventions
            } else {
                console.log('ET ON FAIT DES PETITS TOURS !!!!')
                dataToDisplay = this.interventions
            }
            this.dataLength = dataToDisplay.length
            console.log(this.numberPerPage)
            console.log(this.page * this.numberPerPage, (this.page * this.numberPerPage) + this.numberPerPage)
            return dataToDisplay.slice(this.page * parseInt(this.numberPerPage), (this.page * parseInt(this.numberPerPage)) +
                parseInt(this.numberPerPage))
        }
    },
    mounted() {
        this.headerArray.map(() => {
            this.searchFields.push("")
        })


        this.$root.$on('confirmDeletion', () => {
            for (let i = 0; i < this.interventionsList.length; i++) {
                if (this.interventionsList[i].reference === this.selectedRef) {
                    this.interventionsList.splice(i, 1)
                    break
                }
            }
            this.displayAlert = false
        })
        this.$root.$on('confirmCreationEvent', (data)=>{
            console.log('event root trigered', data)
            this.createMode = false
        })
    },
    methods: {
        testClick() {
            console.log('mais....')
            alert('pouet!')
        },

        filterValues() {
            switch (this.filter) {
                case FILTER.NONE:
                    return this.interventionsList
                default:
                    return []
            }
        },
        orderValues(order) {
            this.interventions.sort((a, b) => {
                let key = order
                if (a[key] < b[key])
                    return this.lastColumnClicked === key ? this.reverse ? -1 : 1 : -1;
                if (a[key] > b[key])
                    return this.lastColumnClicked === key ? this.reverse ? 1 : -1 : 1;
                return 0;
            });
            this.lastColumnClicked === order ? this.reverse = !this.reverse : this.lastColumnClicked = order
        },

        // changeFilter(filter) {
        //     Helpers.isInEnum(FILTER, filter) ? this.filter = filter : console.error("unknown filter : ", filter)
        // },

        changeOrder(order) {
            this.orderValues(order)
        },

        changePage(direction) {

            switch (direction) {
                case 'first':
                    this.page = 0
                    break
                case 'last':
                    this.page = Math.ceil(this.dataLength / this.numberPerPage) - 1
                    break
                case 'next':
                    if (this.dataLength > (this.page * this.numberPerPage) + this.numberPerPage) {
                        this.page += 1
                    }
                    break
                case 'previous':
                    if (this.page > 0) {
                        this.page -= 1
                    }
                    break
                default:
                    break
            }
        },
        getLabel(rawLabel) {
            if (this.labels[rawLabel] !== undefined) {
                return this.labels[rawLabel]
            } else {
                return rawLabel
            }
        },
        askForDeletion(reference) {
            this.displayAlert = true
            this.selectedRef = reference

        },
        fastEdit(reference) {
            for (let i = 0; i < this.interventionsList.length; i++) {
                if (this.interventionsList[i].reference === reference) {
                    this.interventionToEdit = Object.assign({}, this.interventionsList[i])
                    console.log(this.interventionToEdit)
                    break
                }
            }
        },
        singleEdit(reference, index){
            console.log('toto')
            this.fieldToEdit = index
            this.fastEdit(reference)
            console.log(this.fieldToEdit)
        },

        validateChanges() {

            this.$emit('updateIntervention', this.interventionToEdit)
            this.interventionToEdit = {}
            this.fieldToEdit = null
        },
        cancelChanges() {
            this.interventionToEdit = {}
        },

        setDetailsIntervention(reference) {
            console.log('in datalist js')
            this.$emit('setDetailsIntervention', reference)

        },

        activateCreationMode(){
            console.log('MAIS.....')
            this.createMode = true
        },
        confirmCreation(data){
            console.log('activated and should')
            console.log(data)

        },
        cancelCreation(){
            console.log('kjjhgjhgjhgjhg')
            this.createMode = false
        }

    }
}
