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

    const setEditable = (prefix, id, event) => {
        const textNode = event.target;
        const parentNode = event.target.parentNode;
        const inputNode = view.addOneNode(undefined, "input", textNode.className, id, prefix, textNode.innerText);
        // parentNode.replaceChild(inputNode, textNode);
        // inputNode.value = textNode.innerText
        textNode.addEventListener("keyup", (e) => {
            if (e.target.value.trim() === '' || e.key !== "Enter") return;
            const update = {title: e.target.value};
            model.editOne(id, update)
            .then((res) => {
                state.list = state.list.map((doc) => {
                    if (doc.id === id) {
                        doc.title = update.title;
                    }
                })
            })
        })
    }

    const toggleItem = (id, newCheckBoxValue) => {
        const update = {completed: newCheckBoxValue};
        model.editOne(id, update)
        .then((res) => {
            state.list = state.list.map((doc) => {
                if (doc.id === id) {
                    doc.completed = newCheckBoxValue;
                }
            })
        })
    }

    const deleteItem = (id) => {
        state.list = state.list.filter((doc) => doc.id !== id);
        model.deleteOne(id);
    }

    const listUpdateListener = () => {
        const listNode = document.getElementById(`${node.list.container.prefix}${node.idConcater}${node.list.container.id}`);
        listNode.addEventListener("click", (event) => {
            const [prefix, id] = event.target.id.split(node.idConcater);
            if (prefix === node.list.item.buttonDelete.prefix) deleteItem(+id);
            else if (prefix === node.list.item.completed.prefix) toggleItem(+id, event.target.checked);
            else if (prefix === node.list.item.text.prefix) setEditable(prefix, +id, event);
        });
        return listNode;
    }

    const addItem = (event) => {
        const inputText = document.getElementById(`${node.input.field.prefix}${node.idConcater}${node.input.field.id}`).value
            , docID = state.list.length ? state.list[state.list.length - 1].id + 1 : 1;
        if (!inputText.trim().length) return;
        // create new instance of item
        const item = new Item(inputText, docID);
        // persist the addition to backend, then update the state.list for a re-render
        model.addOne(item).then((item) => {
            state.list = [...state.list, item]
        });
        inputText.target.value = "";
    }

    const addItemListener = () => {
        const btn = document.getElementById(`${node.input.buttonAdd.prefix}${node.idConcater}${node.input.buttonAdd.id}`);
        btn.addEventListener("click", addItem);
        return btn;
    }

    // grab data from backend and assign to state, embed event listeners
    const init = async (url, path, id) => state.list = await model.getAll(url, path, id);

    const exec = async (url, path, id) => {
        await init(url, path, id);
        addItemListener();
        // without async await, the chain of items not formed yet for listeners to work properly
        listUpdateListener();
    }

    return {exec};
};

const controller = Controller(model, view, node);
export default controller;
