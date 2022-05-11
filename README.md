#vanilaJS-todo

- May 10, 2022

* Got error when importing to index.js using const varName = require('...)
  ` Uncaught ReferenceError: require is not defined at index.js:2:16`
  Solution:
  use import command, and in the html script tag add type="module".
  `import varName from "../folder/fileName.js"` (extension must be mentioned!)
  use `export default function fnName`. To export a variable, the variable must
  be declared first, e.g.:

  ```
  const varName = "bruh"
  export default varName;
  ```

* Page lost event listener after one operation
  Cause:
  Until this time, I have a list container node to which the items nodes chain I sticked to.
  Everytime the list got updated, the set list create a new list container node for the items
  chain of nodes to stick too, which container node will be sticked to the existing DOM node.
  Since I did not stick another listener into this new list container node, of course it won't
  listen to user's click.
  Solution:
  First solution: I can have a static list container node and have my chain of items nodes sticked
  to a sub-list container node, which will be renewed everytime the list got updated, like the
  sub-listA and B below:

```
        set list(newList) {
            this.#list = [...newList];

            // create a parent node to stick all the child nodes in sublist todo
            const listNodeA = view.addOneNode(undefined, node.list.subcontainerA.tag, node.list.subcontainerA.className, node.list.subcontainerA.id, node.list.subcontainerA.prefix);
            const listA = this.#list.filter((item) => item.isCompleted === false);
            // adding child nodes to listNode
            view.addTodoNodes(listNodeA, node.list.item.container.tag, node.list.item.container.className, node.list.item.container.prefix, listA);

            // create a parent node to stick all the child nodes in sublist done
            const listNodeB = view.addOneNode(undefined, node.list.subcontainerB.tag, node.list.subcontainerB.className, node.list.subcontainerB.id, node.list.subcontainerB.prefix);
            const listB = this.#list.filter((item) => item.isCompleted === true);
            // adding child nodes to listNode
            view.addDoneNodes(listNodeB, node.list.item.container.tag, node.list.item.container.className, node.list.item.container.prefix, listB);

            // grab container element to hook
            const listContainer = document.getElementById(`${node.list.container.prefix}${node.idConcater}${node.list.container.id}`);
            // render on client by sticking the listNode -parentNode- to mainNode
            view.render(listContainer, listNodeA);
            view.render(listContainer, listNodeB);
        }
```

OR
stick another listener for everytime the list got updated, e.g.:

```
    const deleteItem = async (id) => {
        const result = await model.deleteOne(id);
        console.log(result.ok)
        if (result.ok) state.list = state.list.filter((doc) => doc.id !== id)
        else state.list = [...state.list];
        listUpdateListener();
        // exec();
        return result;
    }
```

OR, of course, instead of listUpdateListener(), I can do exec() which renders EVERYTHING.
I'll do the first approach. I think it would be more efficient as I just need to stick the
listener once.
