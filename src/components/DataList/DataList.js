import {Helpers} from "../../utils/Helpers";
import {FILTER, ORDER} from "../../enums/DataListEnum";

export default {
    name: 'data-list',
    components: {},
    props: ['interventionsList']
    ,
    data() {
        return {
            headerArray: Helpers.getKeysFromObject(this.interventionsList[0]),
            interventions: this.interventionsList,
            filter: FILTER.NONE,
            order: ORDER.DEFAULT,
            lastColumnClicked: null,
            reverse: false,
            page:0,
            numberPerPage: 5,
            searchFields: []
        }
    },
    computed: {
        filteredInterventions() {
            if ((!Helpers.isElementsInArrayEmpty(Helpers.getArrayFromObject(this.searchFields)))) {
                let searchedInterventions = []
                for(let i =0; i < this.interventionsList.length; i++){
                    let interventionAsArray = Helpers.getArrayFromObject(this.interventionsList[i])
                    let shouldReturnIntervention = true
                    for (let a =0; a < interventionAsArray.length; a++){
                        if (!interventionAsArray[a].includes(this.searchFields[a])){
                            shouldReturnIntervention = false
                        }
                    }
                    if(shouldReturnIntervention){
                        searchedInterventions.push(this.interventionsList[i])
                    }
                }




                return searchedInterventions.slice(this.page * this.numberPerPage,(this.page * this.numberPerPage) + this.numberPerPage)
            } else {
                return this.interventions.slice(this.page * this.numberPerPage,(this.page * this.numberPerPage) + this.numberPerPage)
            }
        }
    },
    mounted() {
        this.headerArray.map(() => {
            this.searchFields.push("")
        })
    },
    methods: {
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

        changeFilter(filter) {
            Helpers.isInEnum(FILTER, filter) ? this.filter = filter : console.error("unknown filter : ", filter)
        },

        changeOrder(order) {
            this.orderValues(order)
        },

        changePage(direction){

            switch(direction){
                case 'first':
                    this.page = 0
                    break
                case 'last':
                    console.log(this.interventions.length)
                    console.log(this.numberPerPage)
                    console.log(this.interventions.length / this.numberPerPage)
                    console.log((this.interventions.length / this.numberPerPage).toFixed())
                    this.page = (this.interventions.length / this.numberPerPage).toFixed() -1
                    break
                case 'next':
                    if (this.interventions.length > this.page * this.numberPerPage){
                        this.page += 1
                    }
                    break
                case 'previous':
                    if (this.page > 0){
                        this.page -= 1
                    }
                    break
                default:
                    console.error("ké? no abla la pagos?")
                    break
            }

            console.log(this.page)
        }
    }
}