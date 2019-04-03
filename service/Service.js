import {Helpers} from "../src/utils/Helpers";

const technicians = [
    {
        first_name: "Mael",
        last_name: "Robert",
        telephone_number: "0611764565"
    },
    {
        first_name: "Sacha",
        last_name: "Dupuy",
        telephone_number: "0611777765"
    },
    {
        first_name: "Louna",
        last_name: "Rey",
        telephone_number: "0611123565"
    },
    {
        first_name: "Julien",
        last_name: "Lambert",
        telephone_number: "0611767885"
    },
    {
        first_name: "Célia",
        last_name: "Roussel",
        telephone_number: "0611764588"
    }]

const interventionTypes = [
    'Installation',
    'Maintenance',
    'Formation',
    'Dépannage'
]

const status = [
    'En cours',
    'A venir',
    'Terminé',
]

const faker = require('faker')
faker.locale = 'fr'



export class Service {

    static interventionsList = null

    static getInterventions() {
        if (this.interventionsList === null) {


        const faker = require('faker')
        faker.locale = 'fr'
        let rawData = require('./interventions')
        let rawList = rawData.interventions
        let itemAsArray = Helpers.getKeysFromObject(rawList[0])
        let randomData = []
        for (let a = 0; a < 30; a++) {
            let tech = this.getTechnician()
            let dates = this.getDates()
            let item = {
                "reference": this.getReference(),
                "start_date": dates.start_date.toISOString(),
                "end_date": dates.end_date.toISOString(),
                "address": faker.random.number() + ' ' +faker.address.streetName(),
                "city": faker.address.city(),
                "zip": faker.address.zipCode(),
                "technician_first_name": tech.first_name,
                "technician_last_name": tech.last_name,
                "telephone_number": tech.telephone_number,
                "type": this.getType(),
                "price": faker.commerce.price(),
                "status": this.getStatus(),
            }
            randomData.push(item)
        }
        this.interventionsList = randomData
        return randomData
        } else {
            return this.interventionsList
        }
    }

    static getReference() {
        let ref = ''
        for (let i = 0; i < 9; i++) {
            ref += faker.random.alphaNumeric()
        }
        return ref
    }

    static getTechnician(){
        return technicians[Math.floor(Math.random() * Math.floor(technicians.length - 1))]
    }

    static getDates(){
        let rand = Math.floor(Math.random() * Math.floor(2))
        let date = {
            start_date: null,
            end_date: null
        }
        if (rand === 0){
              date.start_date = new Date(faker.date.past())
                date.end_date = new Date(faker.date.past())
        } else {
            date.start_date =  new Date(faker.date.past())
            date.end_date = new Date(faker.date.past())
        }
        return date
    }

    static getType(){
        return interventionTypes[Math.floor(Math.random() * Math.floor(interventionTypes.length))]
    }

    static getStatus(){
        return status[Math.floor(Math.random() * Math.floor(status.length))]
    }


    /*static deleteIntervention(reference){
        console.log('toto')
        console.log(reference)

        for (let i = 0; i< this.interventionsList.length; i++){
            if (this.interventionsList[i].reference === reference){
                this.interventionsList.splice(i,1)
                console.log('i m batman')
            }
        }
        console.log(this.interventionsList.length)
    }*/

}