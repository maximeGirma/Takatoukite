import {Helpers} from "../../utils/Helpers";

export default {
    name: 'details',
    components: {},
    props: ['details']
    ,
    data() {
        return {
            mDetails: this.details,
            headerArray: Helpers.getKeysFromObject(this.details),
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
        },

        validateChanges(){
            this.$emit('updateIntervention',this.mDetails)
            this.editMode = false
        },

        goBack(){
            this.$emit('goBack')
        }

    }
}
