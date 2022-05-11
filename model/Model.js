"use strict"
import {node} from "../inputs.js";
import api from "../model/API.js";
import view from "../view/View.js";

// a variable to store Function "Class" that returns functions to process data from backend into DOM nodes to render
const Model = (view, api, node) => {
    const {getAll, addOne, editOne, deleteOne} = api;
    class Item {
        // constructor(title, id, completed = false, userId = 100) {
        //     // try align the following properties order the same with the seed data properties order
        //     this.userId = userId,
        //     this.id = id,
        //     this.title = title,
        //     this.completed = completed
        constructor(content, id, isCompleted = false) {
            this.content = content,
            this.id = id,
            this.isCompleted = isCompleted
        }
    }
    class State {

        #list = [];

        get list() {
            console.log(this.#list)
            return this.#list;
        }

        set list(newList) {
            this.#list = [...newList];
            // create a parent node to stick all the child nodes
            const listNode = view.addOneNode(undefined, node.list.container.tag, node.list.container.className, node.list.container.id, node.list.container.prefix);
            // adding child nodes to listNode
            view.addMoreNodes(listNode, node.list.item.container.tag, node.list.item.container.className, node.list.item.container.prefix, this.#list)
            // grab container element to hook
            const mainNode = document.querySelector(node.main.tag);
            // render on client by sticking the listNode -parentNode- to mainNode
            view.render(mainNode, listNode);
        }
    }

    return {Item, State, getAll, addOne, editOne, deleteOne};

};

const model = Model(view, api, node);
export default model;
