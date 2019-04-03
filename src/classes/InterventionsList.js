import {Intervention} from "./Intervention";
import {Helpers} from "../utils/Helpers";

export class InterventionsList{

    interventionsList = []

    constructor(rawList){
        rawList.map((rawIntervention)=>{
            this.interventionsList.push(new Intervention(rawIntervention))
        })
    }

    getAbstractInterventions(){
        let data = []
        for (let i = 0; i < this.interventionsList.length; i++){
            data.push(this.interventionsList[i].getAbstractIntervention())
        }
        return data
    }

    getFullIntervention(reference){

        for (let i = 0; i < this.interventionsList.length; i++){
            if (this.interventionsList[i].reference === reference){
                console.log("let's go")
                return this.interventionsList[i].getFullIntervention()
            }
        }
        return null
    }

    updateIntervention(intervention){
        for (let i = 0; i < this.interventionsList.length; i++){
            if (this.interventionsList[i].reference === intervention.reference){
                console.log("let's update in the class")
                let keys = Helpers.getKeysFromObject(intervention)

                for (let a = 0; a < keys.length; a++) {
                    this.interventionsList[i][keys[a]] = intervention[keys[a]]
                }
            }
        }
        return this
    }

    addIntervention(rawData){
        console.log(rawData)
        console.log('le caca des pigeons cest caca faut pas manger')
        let arrData = Helpers.getArrayFromObject(rawData)
        console.log(Helpers.getKeysFromObject(rawData))
        arrData.map((e)=>{console.log(e)})
    }
}