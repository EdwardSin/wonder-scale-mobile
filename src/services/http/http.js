export const headers = { "Content-Type": "application/json; charset=utf-8" };
export const http = {
    get: (url, headers, callback, errorCallback) => {
        fetch(url, {
            method: 'GET',
            credentials: "same-origin",
            headers
        }
        ).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        })
            .then(result => callback(result))
            .catch(err => {
                errorCallback ? errorCallback(err) : ''
            });
    },
    getSync: (url, headers) => {
        return fetch(url, {
            method: 'GET',
            credentials: "same-origin",
            headers
        }
        ).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return Promise.resolve(res.json());
            }
        })
            .catch(err => {
                return Promise.reject(err);
            });
    },
    post: (url, data, headers, callback, errorCallback) => {
        fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        })
            .then(result => { callback(result) })
            .catch(err => { errorCallback ? errorCallback(err) : '' });
    },
    postSync: (url, data, headers) => {
        return fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        });
    },
    put: (url, data, headers, callback, errorCallback) => {
        fetch(url, {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        })
            .then(result => { callback(result) })
            .catch(err => { errorCallback ? errorCallback(err) : '' });
    },
    putSync: (url, data, headers) => {
        return fetch(url, {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return Promise.resolve(res.json());
            }
        })
            .catch(err => {
                return Promise.reject(err);
            })
    }
    // delete: (url, data, headers, callback) => {

    // }
}