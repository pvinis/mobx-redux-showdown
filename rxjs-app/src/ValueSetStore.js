
    error = undefined // TODO: {valueSetId: error}

    // @action
    load = (valueSetId) => {

        const url = 'http://hapi.fhir.org/baseDstu3/ValueSet/' + valueSetId

        this.loading.set(valueSetId, true)
        this.error = undefined

        fetch(url)
            ....
            .catch((error) => {
                console.error('🛑: ' + error)
                this.error = error
            })
            .finally(() => {
                this.loading.set(valueSetId, false)
            })
    }

    /** return a display value for a given value set and code */
    display = ({valueSet, code}) => {

        this.load(valueSet)

        const valueSetObject = this.valueSet(valueSet)
        if (valueSetObject === undefined) {
            return 'Unknown value set: ' + valueSet
        }
        return valueSetObject[code]
    }
