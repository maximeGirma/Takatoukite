<template>
    <div id="app">

        <img alt="Vue logo" src="./assets/logo.png">
        <DataList :interventionsList="interventionsList"/>
    </div>
</template>

<script>
    import DataList from "./components/DataList/index.vue";
    import {Service} from "../service/Service";

    export default {
        name: 'app',
        components: {
            DataList
        },
        data(){
            return{
                interventionsList: Service.getInterventions()
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
