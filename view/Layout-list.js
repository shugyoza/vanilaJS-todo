"use strict"
import {node} from "../inputs.js";
import view from "./View.js";
// Static Lay-out

const Layout = (node, view) => {

    const _ = node
        , {addOneNode} = view;

    const main = document.querySelector(_.main.tag)
        , header = addOneNode(main, _.header.tag, _.header.className)
            , title = addOneNode(header, _.title.tag, _.title.className, _.title.id, _.title.prefix, _.title.text)
            , nav = addOneNode(header, _.nav.container.tag, _.nav.container.className, _.nav.container.id, _.nav.container.prefix)
                , account = addOneNode(nav, _.nav.account.tag, _.nav.account.className, _.nav.account.id, _.nav.account.prefix, _.nav.account.text)
            , inputContainer = addOneNode(header, _.input.container.tag, _.input.container.className, _.input.container.id, _.input.container.prefix)
                , inputField = addOneNode(inputContainer, _.input.field.tag, _.input.field.className, _.input.field.id, _.input.field.prefix).placeholder = _.input.field.placeholder
                , addButton = addOneNode(inputContainer, _.input.buttonAdd.tag, _.input.buttonAdd.className, _.input.buttonAdd.id, _.input.buttonAdd.prefix, _.input.buttonAdd.text)
        // this listSection must exist and hooked to main so that callback can grab it and add event listener
        , listContainer = addOneNode(main, _.list.container.tag, _.list.container.className, _.list.container.id, _.list.container.prefix)
        , footer = addOneNode(main, _.footer.container.tag, _.footer.container.className, _.footer.container.id, _.footer.container.prefix)

    return {main};
}

const layout = Layout(node, view);
export default layout;
