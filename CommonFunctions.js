import { configuration } from './configuration'

export const serviceCall = (path, headers, method, params) => {
    let options = {
        method,
        headers: { ...headers, 'Content-Type': 'application/json' },
    }

    if (method !== 'get') options.body = JSON.stringify(params)

    return fetch(`${configuration.API_URL}${path}`, options).then(handleResponse, handleError)
}

const handleResponse = response => {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json))
            } else {
                response.text().then(text => resolve(text))
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text))
        }
    });
}

const handleError = error => Promise.reject(error && error.message)
