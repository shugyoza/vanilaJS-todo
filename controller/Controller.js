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

    // function to save whatever value in the text field into the backend
    const saveEdit = async (prefix, id, event) => {
        const inputField = document.getElementById(`${node.list.item.text.prefix}${node.idConcater}${id}`);
        if (inputField.value.trim() === '') await init();
        const result = await model.editOne(id, {content: inputField.value});
        return result;
    };

    // function to remove all save buttons in the existing DOM AND save whatever text in the textfield into backend
    const removeSaveButtons = async () => {
        const saveBtns = document.querySelectorAll(`.${node.list.item.buttonSave.className}`)
        await saveBtns.forEach(async (btn) => {
            const [prefix, id] = btn.id.split(`${node.idConcater}`);
            // grab the corresponding text field
            const textField = document.getElementById(`${node.list.item.text.prefix}${node.idConcater}${id}`);
            // GUARD clause!!
            if (textField.value.trim() === '') await init();
            // persist the value into the backend
            else await model.editOne(id, {content: textField.value})
            btn.remove();
        });
    };

    const saveAbandonedEdits = async (event) => {
        console.log(event)
    }

    // function to call saveEdit to save text in text field into the backend when user press enter
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            const [prefix, id] = event.target.id.split(node.idConcater);
            saveEdit(prefix, id, event);
            // move focus to the add item field
            document.getElementById(`${node.input.field.prefix}${node.idConcater}${node.input.field.id}`).focus();
            removeSaveButtons();
            return
        };
    };

    // function to popup SAVE button and embed event listener to the field to save text edit if user press enter
    const editText = (prefix, id, event) => {
        const inputField = event.target;
        const parentNode = event.target.parentNode;
        view.addOneNode(parentNode, node.list.item.buttonSave.tag, node.list.item.buttonSave.className, id, node.list.item.buttonSave.prefix, node.list.item.buttonSave.text);
        inputField.addEventListener("keyup", handleEnter);
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
            const [prefix, id] = event.target.id.split(node.idConcater);
            removeSaveButtons();
            if (prefix === node.list.item.text.prefix) editText(prefix, +id, event);
            else if (prefix === node.list.item.buttonDelete.prefix) deleteItem(+id);
            else if (prefix === node.list.item.completed.prefix) toggleItem(+id, event.target.checked);
            else if (prefix === node.list.item.buttonSave.prefix) saveEdit(prefix, +id, event);
            else saveAbandonedEdits(event);
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
        inputField.focus();
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
