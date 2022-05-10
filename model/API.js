"use strict"

/* API: Function "class" that returns functions to interact with backend
using HTTP Request to perform CRUD. */

const API = () => {

    const getAll = (url, path) => {
        return fetch(`${url}/${path}`)
        .then((response) => response.json())
    };

    const addOne = (newDocument) => {
        return fetch(`${url}/${path}`, {
            method: 'POST',
            body: JSON.stringify(newDocument),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json());
    };

    const editOne = (id, obj) => {
        return fetch(`${url}/${path}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json());
    };

    const deleteOne = (id) => {
        return fetch(`${url}/${path}/${id}`, {
            method: 'DELETE',
        })
    };

    return {
        getAll,
        addOne,
        editOne,
        deleteOne
    }
};

const api = API();
export default api;
