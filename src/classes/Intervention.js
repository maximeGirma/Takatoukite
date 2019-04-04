import {Helpers} from "../utils/Helpers";

export class Intervention {

    reference
    startDate
    endDate
    address
    city
    zip
    technicianFirstName
    technicianLastName
    telephoneNumber
    type
    price
    status

    constructor(rawIntervention) {

        this.reference = rawIntervention.reference
        this.startDate = rawIntervention.start_date.slice(0, 10)
        this.endDate = rawIntervention.end_date.slice(0, 10)
        this.address = rawIntervention.address
        this.city = rawIntervention.city
        this.zip = rawIntervention.zip
        this.technicianFirstName = rawIntervention.technician_first_name
        this.technicianLastName = rawIntervention.technician_last_name
        this.telephoneNumber = rawIntervention.telephone_number
        this.type = rawIntervention.type
        this.price = rawIntervention.price
        this.status = rawIntervention.status
    }

    static buildFromForm(rawData) {
        console.log('row_data', rawData)
        return {
            reference: rawData.reference,
            start_date: rawData.startDate,
            end_date: rawData.endDate,
            address: rawData.address,
            city: rawData.city,
            zip: rawData.zip,
            technician_first_name: rawData.technicianFirstName,
            technician_last_name: rawData.technicianLastName,
            telephone_number: rawData.telephoneNumber,
            type: rawData.type,
            price: rawData.price,
            status: rawData.status,
        }
    }

    getAbstractIntervention() {
        return {
            reference: this.reference,
            startDate: this.startDate,
            endDate: this.endDate,
            address: this.address,
            city: this.city,
            technicianLastName: this.technicianLastName,
            type: this.type,
            price: this.price,
            status: this.status
        }
    }

    getFullIntervention() {
        return {
            reference: this.reference,
            startDate: this.startDate,
            endDate: this.endDate,
            address: this.address,
            city: this.city,
            zip: this.zip,
            technicianFirstName: this.technicianFirstName,
            technicianLastName: this.technicianLastName,
            telephoneNumber: this.telephoneNumber,
            type: this.type,
            price: this.price,
            status: this.status
        }
    }

    static isdatasValid(data, keysArray) {

        let response = {status: true}
        let keysList = Helpers.getKeysFromObject(keysArray)
        console.log('lets go')
        for (let i = 0; i < keysList.length; i++) {
            console.log(data[keysList[i]])
            if (data[keysList[i]] === undefined) {
                return {
                    status: false,
                    message: keysArray[[keysList[i]]] + " n'est pas défini."
                }
            }
        }

        if (data.startDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/) === null) {
            return {
                status: false,
                message: "Le format de la date de début est invalide. Le format correct est AAAA-MM-JJ."
            }
        }
        if (data.endDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/) === null) {
            return {
                status: false,
                message: "Le format de la date de retour est invalide. Le format correct est AAAA-MM-JJ."
            }
        }

        if (data.zip.match("^(([0-8][0-9])|(9[0-5]))[0-9]{3}$") === null) {

            return {
                status: false,
                message: "Le code postal doit être un code postal valide, exemple : 33000"
            }
        }

        if (data.telephoneNumber.match("^((\\+)33|0|0033)[1-9](\\d{2}){4}$") === null) {
            return {
                status: false,
                message: "Le numéro de téléphone est incorrect, exemple : 0677676767"
            }
        }
        let types = [
            'Installation',
            'Maintenance',
            'Formation',
            'Dépannage'
        ]
        if (types.indexOf(data.type) === -1) {
            let typesString = ''
            typesString += types.map((type) => {
                return type
            })
            return {
                status: false,
                message: "Le type d'intervention doit être l'un des types suivants : " + typesString
            }
        }

        console.log('tetetetetet')

        return response
    }

}
