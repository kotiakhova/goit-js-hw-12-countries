// const baseUrl = 'https://restcountries.eu/rest/v2/all';
export default {

    fetchCountries(query) {

        const requestParams = `https://restcountries.eu/rest/v2/name/${query}`
        return fetch(requestParams)
        .then(response => 
            response.json()
        ).catch(error => {})


    }
}