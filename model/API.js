"use strict"
import {endPoint} from "../inputs.js";

/* API: Function "class" that returns functions to interact with backend
using HTTP Request to perform CRUD. */

const API = (endPoint) => {

    const {url, path} = endPoint;

    const getAll = async () => {
        const result = await fetch(`${url}/${path}`).then((response) => response.json());
        return result;

    };

    const addOne = async (newDocument) => {
        const result = await fetch(`${url}/${path}`, {
            method: 'POST',
            body: JSON.stringify(newDocument),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json());
        return result;
    };

    const editOne = async (id, obj) => {
        const result = await fetch(`${url}/${path}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json());
        return result;
    };

    const deleteOne = async (id) => {
        const result = await fetch(`${url}/${path}/${id}`, {
            method: 'DELETE',
        });
        return result;
    };

    return {
        getAll,
        addOne,
        editOne,
        deleteOne
    }
};

const api = API(endPoint);
export default api;
