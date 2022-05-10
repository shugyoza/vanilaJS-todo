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
