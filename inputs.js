"use strict"

export const endPoint = {
    url: "http://localhost:3000", // "https://jsonplaceholder.typicode.com"
    path: "todos"
};

// all the data/attributes for each html node to render
export const node = {

    idConcater: '-',

    main: {
        tag: "main",
        className: null,
        prefix: null,
        id: null,
        text: null
    },

    header: {
        tag: "section",
        className: "header",
        prefix: null,
        id: null,
        text: null
    },

    title: {
        tag: "h1",
        className: "title",
        prefix: null,
        id: null,
        text: "Vanilla JS ToDo App"
    },

    input: {
        container: {
            tag: "section",
            className: "container__input",
            prefix: "container",
            id: "input",
            text: null,
        },

        field: {
            tag: "input",
            className: "input__addItem",
            prefix: "input",
            id: "addItem",
            text: null,
            type: "text",
            placeholder: "Title..."
        },

        buttonAdd: {
            tag: "button",
            className: "btn__addItem",
            prefix: "btn",
            id: "addItem",
            text: "Add"
        }

    },

    list: {
        container: {
            tag: "section",
            className: "container__list",
            prefix: "list",
            id: "container",
            text: null
        },

        subcontainerA: {
            tag: "section",
            className: "container__sublist",
            prefix: "list",
            id: "subcontainerA",
            text: null
        },

        subcontainerB: {
            tag: "section",
            className: "container__sublist",
            prefix: "list",
            id: "subcontainerB",
            text: null
        },

        item: {
            container: {
                tag: "section",
                className: "container__item",
                prefix: "item_container",
                id: null,
                text: null
            },

            no: {
                tag: "span",
                className: "seq-no",
                prefix: "item_seq",
                id: null,
                text: null
            },

            buttonDelete: {
                tag: "button",
                className: "btn-delete",
                prefix: "item_delete",
                id: null,
                text: "x"
            },

            buttonSave: {
                tag: "button",
                className: "btn-save",
                prefix: "item_save",
                id: null,
                text: "Save"
            },

            completed: {
                tag: "input",
                className: "check-done",
                prefix: "item_check",
                id: null,
                text: null,
                type: "checkbox",
                checked: "checked"
            },

            text: {
                tag: "input",
                className: "item_text",
                prefix: "item_text",
                id: null,
                text: null,
                type: "text",
            }
        }
    }
}
