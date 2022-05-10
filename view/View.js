"use strict"
import {node} from "../inputs.js";

// VIEW: a variable that stores a Function "Class";
const View = (node) => {

    // function to add a single DOM node and attach it to the parent (if defined)
    const addOneNode = (parentNode, childTag, childClass, childID, idPrefix = '', childText) => {
        const childNode = document.createElement(childTag);
        if (childClass) childNode.className = childClass;
        if (childID) childNode.id = `${idPrefix}${node.idConcater}${childID}`;
        if (parentNode) parentNode.appendChild(childNode);
        if (!childText) return childNode;
        // adding text into the childNode
        if (childTag === "input" || childTag === "textarea") {
            childNode.value = childText;
        } else childNode.innerText = childText;
        return childNode;
    };

    // function to add a chain of nodes (items in a list)
    const addMoreNodes = (parentNode, childTag, childClass, childIDPrefix, dataList) => {
        if (!dataList.length || !Array.isArray(dataList)) return;
        let counter = dataList.length;

        dataList.forEach((item) => {
            const listNode = addOneNode(undefined, childTag, childClass, item.id, childIDPrefix)
            addOneNode(listNode, node.list.item.no.tag, node.list.item.no.className, item.id, node.list.item.no.prefix, `${counter}`)// "div", "seq-no", counter, "seq", `${counter}`)
            // add delete button to childNode
            addOneNode(listNode, node.list.item.buttonDelete.tag, node.list.item.buttonDelete.className, item.id, node.list.item.buttonDelete.prefix, node.list.item.buttonDelete.text);
            // add completed check input to childNode
            const completed = addOneNode(listNode, node.list.item.completed.tag, node.list.item.completed.className, item.id, node.list.item.completed.prefix);
            completed.type = node.list.item.completed.type;
            if (item.completed == true) completed.checked = node.list.item.completed.checked;
            // add the item text to childNode
            addOneNode(listNode, node.list.item.text.tag, node.list.item.text.className, item.id, node.list.item.text.prefix, item.title);
            parentNode.appendChild(listNode);
            counter--;
        });
        return parentNode;
    };

    // function to render all the list nodes after chaining them
    const render = (containerNode, listNode) => {
        if (!listNode || !containerNode) return;
        // reset input.value to "" if there's any existing content
        document.getElementById(`${node.input.field.prefix}${node.idConcater}${node.input.field.id}`).value = "";

        const id = listNode.id;
        // reset display by removing all list nodes in the container node (with the same id) from client
        if (document.getElementById(id)) document.getElementById(id).remove();
        // if there is no list nodes being displayed, just append this -new- listNode;
        containerNode.appendChild(listNode);
        return containerNode;
    }
    return {addOneNode, addMoreNodes, render};

};

const view = View(node);
export default view;
