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
        }
    },
    computed: {

    },
    mounted() {

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
    }
}
