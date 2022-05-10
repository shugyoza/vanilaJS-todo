import controller from "./Controller/Controller.js";
import {endPoint} from "./inputs.js";

// this element renders the static html elements
import layout from "./view/Layout.js";

// trigger
controller.exec(endPoint.url, endPoint.path);
