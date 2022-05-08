"use strict"

// VIEW
const view = (() => {

    const addOneNode = (parentNode, childTag, childClass, childID, idPrefix = '', childText) => {
        const childNode = document.createElement(childTag);

        if (childClass) childNode.className = childClass;
        if (childID) childNode.id = `${idPrefix}~${childID}`;

        if (parentNode) parentNode.appendChild(childNode);

        if (!childText) return childNode;

        // adding text into the childNode
        if (childTag === "input" || childTag === "textarea") {
            childNode.value = childText;
        }
        childNode.innerText = childText;
        return childNode;
    };

    const addMoreNodes = (parentNode, childTag, childClass, childIDPrefix, dataList) => {
        if (!dataList.length || !Array.isArray(dataList)) return;
        let counter = dataList.length;
        dataList.forEach((datum) => {
            const childNode = document.createElement("section");
                childNode.className = "item";
            addOneNode(childNode, "div", "seq-no", counter, "seq", `${counter}`)
            // add delete button to childNode
            addOneNode(childNode, "button", "btn-delete", datum.id, "del", "x");
            // add completed check input to childNode
            const chkBox = addOneNode(childNode, "input", "chk-done", datum.id, "chk");
            chkBox.type = 'checkbox';
            chkBox.checked = datum.completed;
            // add the item text to childNode
            addOneNode(childNode, childTag, childClass, datum.id, childIDPrefix, datum.title);
            parentNode.appendChild(childNode);
            counter--;
        });
        return parentNode;
    };

    // function to render all the list nodes after chaining them
    const render = (containerNode, listNode) => {
        if (!listNode || !containerNode) return;
        // reset input.value to "" if there's any existing content
        document.getElementById("input~addItem").value = "";

        const _id = listNode.id;
        // reset display by removing all list nodes in the container node (with the same id) from client
        if (document.getElementById(_id)) {
            document.getElementById(_id).remove();
            containerNode.appendChild(listNode);
        }
        // if there is no list nodes being displayed, just append this -new- listNode;
        else containerNode.appendChild(listNode);
    }

    return {addOneNode, addMoreNodes, render};

})();

// API
const api = (() => {

    const getAll = (url, path, id = '') => {
        return fetch(`${url}/${path}/${id}`)
        .then((response) => response.json())
    };

    const deleteOne = (id) => {
        return fetch(`${url}/${path}/${id}`, {
            method: 'DELETE',
        })
    };

    return {
        getAll,
        deleteOne
    }
})();

// MODEL
const model = ((view) => {
    class Datum {
        constructor(title, id, completed = false, userId = 100) {
            this.title = title,
            this.id = id,
            this.completed = completed,
            this.userId = userId
        }
    }
    class State {

        #list = [];

        get list() {
            return this.#list;
        }

        set list(newList) {
            this.#list = [...newList];

            const listNode = view.addOneNode(undefined, "section", "section__list", "list", "section");
            const childTag = "button";
            // adding child nodes to listNode
            view.addMoreNodes(listNode, childTag, "item-text", "item-text", this.#list);        // grab container element to hook
            const mainNode = document.querySelector("main");

            // render on client
            view.render(mainNode, listNode);
        }
    }

    return {Datum, State};

})(view);


// CONTROLLER
const Controller = ((api, model, view) => {

    const {Datum, State} = model;

    const state = new State();

    const addOne = (e) => {
        const inputText = document.getElementById(`input~addItem`).value
            , docID = state.list.length ? state.list[state.list.length - 1].id + 1 : 1;

        // guard clause. if there is no input, do nothing
        if (!inputText.trim().length) return;

        // constructor(title, id, completed = false, userId = 100) {
        const datum = new Datum(inputText, docID);
        const newList = [...state.list, datum];
        state.list = newList;
        return state.list;
    }

    const editOne = (e) => {
        console.log(e.target)
    }

    const addInputListener = (eventType, htmlTag, callback, nodeID) => {
        const btn = nodeID ? document.getElementById(nodeID) : document.querySelector(htmlTag);
        btn.addEventListener(eventType, callback);
        return btn;
    }

    const listSectionListener = (eventType, htmlTag, callback, nodeID) => {
        const section = nodeID ? document.getElementById(nodeID) : document.querySelector(htmlTag);
        section.addEventListener(eventType, callback);
        console.log(164, section)
        return section;
    }

    // grab data from backend and assign to state
    const init = async (url, path, id) => {
        // populate the data
        state.list = await api.getAll(url, path, id);
        // then add the event listeners
        await addInputListener("click", "button", addOne, "btn~addItem")
        await listSectionListener("click", "section", editOne, "section~list")

        return state.list;
    };
    // const init = () => state.list = [];

/*
    const execute = async (url, path, id) => {
        await init(url, path, id)
        .then((res) => addInputListener("click", "button", addOne, "btn~addItem"))
        .then((res) => listSectionListener("click", "section", editOne, "section~list"))
    }
*/
    return {init};
})(api, model, view);


// Static Lay-out
const main = document.querySelector("main")
    , header = view.addOneNode(main, "section", "header")
        , title = view.addOneNode(header, "h1", "title", undefined, undefined, "Vanilla JS ToDo List")

        , inputSection = view.addOneNode(header, "section", "section__input")
            , inputField = view.addOneNode(inputSection, "input", "input__addItem", "addItem", "input").placeholder = "Title..."
            , addButton = view.addOneNode(inputSection, "button", "btn__addItem", "addItem", "btn", "Add")
    // this listSection must exist and hooked to main so that callback can grab it and add event listener
    , listSection = view.addOneNode(main, "section", "section__list", "list", "section");


// trigger
const url = "https://jsonplaceholder.typicode.com"
    , path = "todos";

Controller.init(url, path);
