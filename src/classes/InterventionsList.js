import {Intervention} from "./Intervention";

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
    }
}