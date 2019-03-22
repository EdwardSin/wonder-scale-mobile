export const headers = { "Content-Type": "application/json; charset=utf-8" };
export const http = {
    get: (url, headers, callback, errorCallback) => {
        fetch(url, {
                method: 'GET',
                credentials: "same-origin",
                headers: headers
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
            .catch(err => { errorCallback ? errorCallback(err) : alert(err) });
    },
    post: (url, data, headers, callback, errorCallback) => {
        fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers: headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        })
            .then(result => { callback(result) })
            .catch(err => { errorCallback ? errorCallback(err) : alert(err) });
    },
    put: (url, data, headers, callback, errorCallback) => {
        fetch(url, {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify(data),
            headers: headers
        }).then(res => {
            if (!res.ok) {
                throw res['_bodyText'];
            }
            else {
                return res.json();
            }
        })
            .then(result => { callback(result) })
            .catch(err => { errorCallback ? errorCallback(err) : alert(err) });
    },
    // delete: (url, data, headers, callback) => {

    // }
}