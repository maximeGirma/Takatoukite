export default {
    name: 'alert-modal',
    components: {

    },
    props: ['displayAlert']
    ,
    data() {
        return {
            displayAlert: this.displayAlert
        }
    },
    computed: {

    },
    mounted() {
        console.log(this.displayAlert2)
        console.log(this.displayAlert)
    },
    methods: {
        deleteIntervention(){

            this.$root.$emit('confirmDeletion', 'toto')

        },
        cancelDelete(){
            this.displayAlert = false
        }

    }
}
