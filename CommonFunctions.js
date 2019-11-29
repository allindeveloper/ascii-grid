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

const keys = Array.from({ length: configuration.ADS_LIMIT_ID }, (_, i) => i + 1)

export const helpers = {
    diffDays(d1, d2) {
        var t2 = d2.getTime()
        var t1 = d1.getTime()

        return parseInt((t2 - t1) / (24 * 3600 * 1000))
    },
    randomAdsKey(prevKey) {
        const filter = keys.filter(k => k !== prevKey)
        return filter[Math.floor(Math.random() * filter.length)]
    }
}

const handleError = error => Promise.reject(error && error.message)
