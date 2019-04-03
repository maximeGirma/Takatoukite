/* eslint-disable */
import {Helpers} from "../../utils/Helpers";
import {FILTER, ORDER} from "../../enums/DataListEnum";
import AlertModal from "../AlertModal/index.vue";
import PageSelector from "../PageSelector/index.vue";

export default {
    name: 'main-button',
    components: {},
    props: ['eventKey', 'label']
    ,
    data() {
        return {
            eventKey: this.eventKey,
            label: this.label
        }
    },
    computed: {

    },

    mounted() {

    },
    methods: {
        triggerEvent(){
            console.log('event')
            console.log(this.eventKey)
            this.$emit(this.eventKey, true)
            console.log('fin event')
        }
    }
}
