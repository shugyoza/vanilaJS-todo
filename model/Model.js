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

            // create a parent node to stick all the child nodes in sublist todo
            const listNodeA = view.addOneNode(undefined, node.list.subcontainerA.tag, node.list.subcontainerA.className, node.list.subcontainerA.id, node.list.subcontainerA.prefix);
            const listA = this.#list.filter((item) => item.isCompleted === false);
            // adding child nodes to listNode
            view.addMoreNodes(listNodeA, node.list.item.container.tag, node.list.item.container.className, node.list.item.container.prefix, listA);

            // create a parent node to stick all the child nodes in sublist done
            const listNodeB = view.addOneNode(undefined, node.list.subcontainerB.tag, node.list.subcontainerB.className, node.list.subcontainerB.id, node.list.subcontainerB.prefix);
            const listB = this.#list.filter((item) => item.isCompleted === true);
            // adding child nodes to listNode
            view.addMoreNodes(listNodeB, node.list.item.container.tag, node.list.item.container.className, node.list.item.container.prefix, listB);

            // grab container element to hook
            const listContainer = document.getElementById(`${node.list.container.prefix}${node.idConcater}${node.list.container.id}`);
            // render on client by sticking the listNode -parentNode- to mainNode
            view.render(listContainer, listNodeA);
            view.render(listContainer, listNodeB);
        }
    }

    return {Item, State, getAll, addOne, editOne, deleteOne};

};

const model = Model(view, api, node);
export default model;
