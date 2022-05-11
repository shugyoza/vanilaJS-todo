"use strict"
import {node} from "../inputs.js";
import model from "../model/Model.js";
import view from "../view/View.js";

/* CONTROLLER:
Function "class" that returns functions that handle user's action and instruct Model what to
do with the data
*/

const Controller = (model, view, node) => {

    const {Item, State} = model;
    const state = new State();

    // function to remove all save buttons in the existing DOM
    const removeSaveButtons = () => {
        const saveBtns = document.querySelectorAll(`.${node.list.item.buttonSave.className}`)
        saveBtns.forEach((btn) => btn.remove());
    }

    const saveEdit = (prefix, id, event) => {
        const inputField = document.getElementById(`${node.list.item.text.prefix}${node.idConcater}${id}`);
        console.log(inputField.value)
    }

    const editText = (prefix, id, event) => {
        const inputField = event.target;
        const parentNode = event.target.parentNode;
        console.log(inputField, parentNode)
        const btnSave = view.addOneNode(parentNode, node.list.item.buttonSave.tag, node.list.item.buttonSave.className, id, node.list.item.buttonSave.prefix, node.list.item.buttonSave.text);
        inputField.addEventListener("keyup", saveEdit);
        btnSave.addEventListener("click", saveEdit);
        // textNode.addEventListener("keyup", (e) => {
        //     if (e.target.value.trim() === '' || e.key !== "Enter") return;
        //     const update = {title: e.target.value};
        //     model.editOne(id, update)
        //     .then((res) => {
        //         state.list = state.list.map((doc) => {
        //             if (doc.id === id) {
        //                 doc.title = update.title;
        //             }
        //         })
        //     })
        // })
    }

    const toggleItem = async (id, newCheckBoxValue) => {
        const update = {isCompleted: newCheckBoxValue};
        const result = await model.editOne(id, update);
        /* unlike clicked button, a toggled checkbox won't fire a re-render,
        thus we invoke state.list = model.getAll() to force a re-render */
        if (result) state.list = await model.getAll();
        else state.list = [...state.list];
        return result;
    };

    const deleteItem = async (id) => {
        const result = await model.deleteOne(id);
        if (result.ok) state.list = state.list.filter((doc) => doc.id !== id)
        else state.list = [...state.list];
        return result;
    }

    const listUpdateListener = () => {
        const listNode = document.getElementById(`${node.list.container.prefix}${node.idConcater}${node.list.container.id}`);
        listNode.addEventListener("click", (event) => {
            console.log(event)
            const [prefix, id] = event.target.id.split(node.idConcater);
            removeSaveButtons();
            if (prefix === node.list.item.text.prefix) editText(prefix, +id, event);
            else if (prefix === node.list.item.buttonDelete.prefix) deleteItem(+id);
            else if (prefix === node.list.item.completed.prefix) toggleItem(+id, event.target.checked);
            else if (prefix === node.list.item.buttonSave.prefix) saveEdit(prefix, +id, event)
        });
        return listNode;
    }

    const addItem = async (event) => {
        const inputField = document.getElementById(`${node.input.field.prefix}${node.idConcater}${node.input.field.id}`)
            , docID = state.list.length ? state.list[state.list.length - 1].id + 1 : 1;
        if (!inputField.value.trim().length) return;
        // create new instance of item
        const newItem = new Item(inputField.value, docID);
        inputField.value = "";
        // persist the addition to backend
        const addedItem = await model.addOne(newItem);

        // update the state.list for a re-render
        if (addedItem) state.list = [...state.list, addedItem];
        else state.list = [...state.list];
        return addedItem;
    }

    const addItemListener = () => {
        const btn = document.getElementById(`${node.input.buttonAdd.prefix}${node.idConcater}${node.input.buttonAdd.id}`);
        btn.addEventListener("click", addItem);
        return btn;
    }

    // grab data from backend and assign to state, embed event listeners
    const init = async () => {
        const list = await model.getAll();
        if (list) state.list = [...list];
        else state.list = [...state.list];
    }

    async function exec () {
        await init();
        addItemListener();
        // without async await, the chain of items not formed yet for listeners to work properly
        listUpdateListener();
    }

    return {exec};
};

const controller = Controller(model, view, node);
export default controller;
