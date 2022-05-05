"use strict"

// Lay-out
const main = document.querySelector("main");

    // create header section to contain title
    const header = document.createElement("section");
        header.className = "header";
        // create title
        const title = document.createElement("h1");
            title.innerText = "Vanilla JS ToDo List";
            title.className = "title";
        // add title node into header node
        header.appendChild(title);

        // create section to contain input field and add button
        const inputSection = document.createElement("section");
        // adding class into inputSection node
        inputSection.className = "section__input";
            // create input field
            const inputField = document.createElement("input");
                // add placeholder
                inputField.setAttribute("placeholder", "Title...");
                // add class to inputField
                inputField.className = "input__addItem";
            // add input node into inputSection node
            inputSection.appendChild(inputField);

            // create add button
            const addButton = document.createElement("button");
                // add text to button
                addButton.innerText = "Add";
                // add class to button
                addButton.className = "btn___addItem";
            // add the button node on to the inputSection node
            inputSection.appendChild(addButton)

        header.appendChild(inputSection);

    // create the list section to contain todo items
    const list = document.createElement("section");
        list.className = "list";

main.appendChild(header);
main.appendChild(list);
