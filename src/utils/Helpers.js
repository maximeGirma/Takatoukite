export class Helpers {
    static getArrayFromObject(objectToFormat) {
        let arrayToReturn = []
        for (let element in objectToFormat) {
            arrayToReturn.push(objectToFormat[element])
        }
        return arrayToReturn
    }

    static getKeysFromObject(objectToParse) {
        let keys = [];
        for (let key in objectToParse) keys.push(key);
        return keys
    }

    static isInEnum(enumToCheck, elementToFind) {
        if (typeof elementToFind !== "number" && typeof elementToFind !== "string") {
            throw "isInEnum can only check string and Int !!"
        }
        let arrayToCheck = this.getArrayFromObject(enumToCheck)
        for (let i = 0; i < arrayToCheck.length; i++) {
            if (arrayToCheck[i] === elementToFind) {
                return true
            }
        }
        return false
    }
}