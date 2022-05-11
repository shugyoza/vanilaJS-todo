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
        className: undefined,
        prefix: undefined,
        id: undefined,
        text: undefined
    },

    header: {
        tag: "section",
        className: "header",
        prefix: undefined,
        id: undefined,
        text: undefined
    },

    title: {
        tag: "h1",
        className: "title",
        prefix: undefined,
        id: undefined,
        text: "Vanilla JS ToDo App"
    },

    input: {
        container: {
            tag: "section",
            className: "container__input",
            prefix: "container",
            id: "input",
            text: undefined,
        },

        field: {
            tag: "input",
            className: "input__addItem",
            prefix: "input",
            id: "addItem",
            text: undefined,
            type: "text",
            placeholder: "Title..."
        },

        buttonAdd: {
            tag: "button",
            className: "btn__addItem",
            prefix: "btn",
            id: "addItem",
            text: "Add"
        },

        buttonSave: {
            tag: "button",
            className: "btn__saveText",
            prefix: "btn",
            id: "saveText",
            text: "Save"
        }
    },

    list: {
        container: {
            tag: "section",
            className: "container__list",
            prefix: "list",
            id: "container",
            text: undefined
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
                id: undefined,
                text: undefined
            },

            no: {
                tag: "span",
                className: "seq-no",
                prefix: "item_seq",
                id: undefined,
                text: undefined
            },

            buttonDelete: {
                tag: "button",
                className: "btn-delete",
                prefix: "item_delete",
                id: undefined,
                text: "x"
            },

            completed: {
                tag: "input",
                className: "check-done",
                prefix: "item_check",
                id: undefined,
                text: undefined,
                type: "checkbox",
                checked: "checked"
            },

            text: {
                tag: "input",
                className: "item_text",
                prefix: "item_text",
                id: undefined,
                text: undefined,
                type: "text",
            }
        }
    }
}
