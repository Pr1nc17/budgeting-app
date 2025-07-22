export class ApiController {
    constructor(baseURL = 'http://localhost:4000/api') {
        this.baseURL = baseURL;
    }

    async ConnectToGetApi(endpoint, headers) {
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url,
                {
                    headers: headers,
                    method: 'GET',
                });

            let responseJson = await response.json()
            console.log(responseJson)
            return [response.status, responseJson];
        } catch (error) {
            throw error;
        }
    }

    async ConnectToPostApi(endpoint, headers, body) {
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(body),
                });
            return [response.status, await response.json()];
        } catch (error) {
            throw error;
        }
    }
}