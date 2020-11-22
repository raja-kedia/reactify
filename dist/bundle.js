/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_ReactDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react/ReactDom */ "./react/ReactDom.js");
/* harmony import */ var _react_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react/utils */ "./react/utils.js");
/* harmony import */ var _src2_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src2/main */ "./src2/main.js");



const main = new _src2_main__WEBPACK_IMPORTED_MODULE_2__.default();
_react_ReactDom__WEBPACK_IMPORTED_MODULE_0__.default.renderDom((0,_react_utils__WEBPACK_IMPORTED_MODULE_1__.getReactTree)(_src2_main__WEBPACK_IMPORTED_MODULE_2__.default), // <Main />
document.getElementById('app'), _src2_main__WEBPACK_IMPORTED_MODULE_2__.default);

/***/ }),

/***/ "./react/Component.js":
/*!****************************!*\
  !*** ./react/Component.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Component
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./react/pubsub.js");
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateElement */ "./react/CreateElement.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./react/utils.js");




function saveState() {
  let id = {};
  return {
    getId: key => id[key],
    setId: (key, vid) => id[key] = vid,
    get: () => id
  };
}

const State = saveState();
class Component {
  // this.key;
  constructor(props, key) {
    this.props = { ...props
    };

    if (!this.key) {
      this.key = Math.floor(Math.random() * 100);
    } else {
      this.key = key;
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  setState(newstate) {
    const key = JSON.stringify(Object.keys(this.state));
    console.log("A state : ", this, key, State.get(), this.key);
    const obj = State.getId(key);

    if (!obj) {
      State.setId(key, Object.assign({}, this.state));
    }

    State.setId(key, Object.assign({}, State.getId(key), newstate));
    this.state = { ...this.state,
      ...newstate
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.RerenderListener.publish('rerender');
  }

  getComponent() {
    return _CreateElement__WEBPACK_IMPORTED_MODULE_1__.default.createDomElement(this.getJSX());
  }

  getJSX(iden) {
    if (this.state && Object.keys(this.state).length > 0 && State.getId(JSON.stringify(Object.keys(this.state)))) {
      console.log("A: ", this.state, Object.keys(this.state).length, State.getId(JSON.stringify(Object.keys(this.state))));
      this.state = { ...State.getId(JSON.stringify(Object.keys(this.state)))
      };
    }

    return this.render();
  }

  getReactTree(elem, args) {
    // console.log("AF: ", this);
    return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getReactTree)(elem, args, this);
  }

  render() {}

}

/***/ }),

/***/ "./react/CreateElement.js":
/*!********************************!*\
  !*** ./react/CreateElement.js ***!
  \********************************/
/*! namespace exports */
/*! export createDomElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => /* binding */ createElement,
/* harmony export */   "createDomElement": () => /* binding */ createDomElement,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function isEvent(attr) {
  const evet = ['onClick', 'onChange', 'onKeyUp' // 'value'
  ];

  if (evet.indexOf(attr) > -1) {
    return true;
  }

  return false;
}

function createElement(type, attr, children = []) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  const el = {
    type,
    attr,
    // dataid: `${type}`,
    children
  };
  return el;
}
function createDomElement(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node);
  }

  const {
    type,
    attr,
    children
  } = node;
  const el = document.createElement(type);
  Object.keys(attr).map(atr => {
    if (isEvent(atr)) {
      el[atr.toLowerCase()] = attr[atr];
    } else {
      el.setAttribute(atr, attr[atr]);
    }
  });

  if (!children) {
    return el;
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  children.map(child => {
    if (typeof child === 'number' || typeof child === 'string') {
      el.innerText = child;
      return;
    }

    el.appendChild(createDomElement(child));
  });
  return el;
}
const React = {
  createElement,
  createDomElement
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React);

/***/ }),

/***/ "./react/ReactDom.js":
/*!***************************!*\
  !*** ./react/ReactDom.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export renderDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderDom": () => /* binding */ renderDom,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./react/pubsub.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./react/utils.js");
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateElement */ "./react/CreateElement.js");
/* harmony import */ var _diffandpatch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diffandpatch */ "./react/diffandpatch.js");

 // import Main from '../src/main';




function oldtreeUtil() {
  let oldT = {};
  return {
    setOldtree: tree => oldT = tree,
    getOldtree: () => oldT
  };
}

const TreeUtil = oldtreeUtil();
function renderDom(reactElem, container, MainElem) {
  _pubsub__WEBPACK_IMPORTED_MODULE_0__.RerenderListener.subscribe('rerender', rerender.bind([container, MainElem]));
  TreeUtil.setOldtree(reactElem); // console.log("A: ", reactElem, );

  const initialdomTree = (0,_CreateElement__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(reactElem);
  container.appendChild(initialdomTree);
}

function rerender() {
  const newTree = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getReactTree)(this[1]);
  const oldTree = TreeUtil.getOldtree();
  const diffTree = (0,_diffandpatch__WEBPACK_IMPORTED_MODULE_3__.diff)(newTree, oldTree);
  console.log("Ab: ", newTree, oldTree, diffTree);
  (0,_diffandpatch__WEBPACK_IMPORTED_MODULE_3__.patch)(this[0], diffTree);
  TreeUtil.setOldtree(newTree); // oldTree = newTree;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  renderDom
});

/***/ }),

/***/ "./react/diffandpatch.js":
/*!*******************************!*\
  !*** ./react/diffandpatch.js ***!
  \*******************************/
/*! namespace exports */
/*! export diff [provided] [no usage info] [missing usage info prevents renaming] */
/*! export patch [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "diff": () => /* binding */ diff,
/* harmony export */   "patch": () => /* binding */ patch
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./react/CreateElement.js");

const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
const UPDATE = 'UPDATE';
const SET_PROP = 'SET_PROP';
const REMOVE_PROP = 'REMOVE_PROP';

function changed(node1, node2) {
  return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 || typeof node1 === 'number' && node1 !== node2 || node1.type !== node2.type;
}

function diffProps(newNode, oldNode) {
  const patches = [];
  const props = Object.assign({}, newNode.attr, oldNode.attr);
  Object.keys(props).forEach(name => {
    const newVal = newNode.attr[name];
    const oldVal = oldNode.attr[name];

    if (typeof oldVal === 'function') {} else if (!newVal) {
      patches.push({
        type: REMOVE_PROP,
        name,
        value: oldVal
      });
    } else if (!oldVal || newVal !== oldVal) {
      patches.push({
        type: SET_PROP,
        name,
        value: newVal
      });
    }
  });
  return patches;
}

function diffChildren(newNode, oldNode) {
  const patches = [];
  const patchesLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < patchesLength; i++) {
    const d = diff(newNode.children[i], oldNode.children[i]);
    d ? patches.push(d) : '';
  }

  return patches;
}

function diff(newNode, oldNode) {
  // @Todo:  it fails when oldNode = 0
  if (oldNode === undefined || oldNode === null) {
    return {
      type: CREATE,
      newNode
    };
  }

  if (oldNode === undefined || oldNode === null) {
    return {
      type: REMOVE
    };
  }

  if (changed(newNode, oldNode)) {
    return {
      type: REPLACE,
      newNode
    };
  }

  if (newNode.type) {
    return {
      v: newNode.type,
      type: UPDATE,
      attr: diffProps(newNode, oldNode),
      children: diffChildren(newNode, oldNode)
    };
  }
}

function setProp(target, name, value) {
  //@
  // if (name === 'className') {
  //     return target.setAttribute('class', value)
  // }
  if (name === 'value') {
    return target.value = value;
  }

  target.setAttribute(name, value);
} // Start with the last line,
// then className


function removeProp(target, name, value) {
  // if (name === 'className') {
  //     return target.removeAttribute('class')
  // }
  target.removeAttribute(name);
}

function patchProps(parent, patches) {
  for (let i = 0; i < patches.length; i++) {
    const propPatch = patches[i];
    const {
      type,
      name,
      value
    } = propPatch;

    if (type === SET_PROP) {
      setProp(parent, name, value);
    }

    if (type === REMOVE_PROP) {
      removeProp(parent, name, value);
    }
  }
}

function patch(parent, patches, index = 0) {
  //@
  if (!patches) {
    return;
  }

  const el = parent.childNodes[index]; // console.log("EL: ", el, patches);

  switch (patches.type) {
    case CREATE:
      {
        const {
          newNode
        } = patches;
        const newEl = (0,_CreateElement__WEBPACK_IMPORTED_MODULE_0__.createDomElement)(newNode);
        return parent.appendChild(newEl);
      }

    case REMOVE:
      {
        return parent.removeChild(el);
      }

    case REPLACE:
      {
        const {
          newNode
        } = patches;
        const newEl = (0,_CreateElement__WEBPACK_IMPORTED_MODULE_0__.createDomElement)(newNode);
        return parent.replaceChild(newEl, el);
      }

    case UPDATE:
      {
        const {
          attr,
          children
        } = patches;
        const rep = el.cloneNode();
        patchProps(rep, attr); // if(patches.v === 'input') {
        //     // const newEl = createDomElement({type: patches.type, })
        //     return parent.replaceChild(rep, el)
        // }

        for (let i = 0; i < children.length; i++) {
          patch(el, children[i], i);
        }
      }
  }
}

function updateInput(patches) {
  if (patches.type === 'input') {
    return parent.replaceChild(newEl, el);
  }
}

/***/ }),

/***/ "./react/pubsub.js":
/*!*************************!*\
  !*** ./react/pubsub.js ***!
  \*************************/
/*! namespace exports */
/*! export RerenderListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RerenderListener": () => /* binding */ RerenderListener
/* harmony export */ });
function rerenderApp() {
  const Obj = {};
  return {
    subscribe: (key, func) => {
      if (!Obj[key]) {
        Obj[key] = func;
      }
    },
    publish: (key, args) => {
      if (Obj[key]) {
        Obj[key](args);
      }
    }
  };
}

const RerenderListener = rerenderApp();

/***/ }),

/***/ "./react/utils.js":
/*!************************!*\
  !*** ./react/utils.js ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements:  */
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/rajakedia/Documents/git/react-self/react/utils.js: Unexpected token, expected \",\" (22:16)\n\n\u001b[0m \u001b[90m 20 | \u001b[39m        }\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 21 | \u001b[39m        child\u001b[33m:\u001b[39m [\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 22 | \u001b[39m            type\u001b[33m:\u001b[39m \u001b[32m'div'\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 23 | \u001b[39m            attr\u001b[33m:\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 24 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 25 | \u001b[39m            }\u001b[33m,\u001b[39m\u001b[0m\n    at Parser._raise (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:790:17)\n    at Parser.raiseWithData (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:783:17)\n    at Parser.raise (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:777:17)\n    at Parser.unexpected (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:9095:16)\n    at Parser.expect (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:9081:28)\n    at Parser.parseExprList (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:11229:14)\n    at Parser.parseArrayLike (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:11133:26)\n    at Parser.parseExprAtom (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:10434:23)\n    at Parser.parseExprSubscripts (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:10094:23)\n    at Parser.parseUpdate (/Users/rajakedia/Documents/git/react-self/node_modules/@babel/parser/lib/index.js:10074:21)");

/***/ }),

/***/ "./src2/counter.js":
/*!*************************!*\
  !*** ./src2/counter.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react/Component */ "./react/Component.js");
/* harmony import */ var _react_CreateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/CreateElement */ "./react/CreateElement.js");
/* harmony import */ var _react_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/utils */ "./react/utils.js");


 // import { getReactTree } from '../react/utils';

class AddButton extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  render() {
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', {
      class: 'button',
      onClick: this.props.increment
    }, ['+']);
  }

}

class Counter extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(props) {
    super(props);
    this.state = {
      value: 5
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    console.log("A: add ", this);
    this.setState({
      value: this.state.value + 1
    });
  }

  render() {
    console.log("A Counter Render: ", this);
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'list'
    }, [(0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'todo'
    }, [this.state.value, (0,_react_utils__WEBPACK_IMPORTED_MODULE_2__.getReactTree)(AddButton, {
      increment: this.increment
    })])]);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Counter);

/***/ }),

/***/ "./src2/inputbox.js":
/*!**************************!*\
  !*** ./src2/inputbox.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react/Component */ "./react/Component.js");
/* harmony import */ var _react_CreateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/CreateElement */ "./react/CreateElement.js");



class InputBox extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(props) {
    super(props);
  }

  render() {
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', {
      class: 'text',
      value: this.props.value,
      onKeyUp: this.props.changeHandler
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputBox);

/***/ }),

/***/ "./src2/list.js":
/*!**********************!*\
  !*** ./src2/list.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react/Component */ "./react/Component.js");
/* harmony import */ var _react_CreateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/CreateElement */ "./react/CreateElement.js");
/* harmony import */ var _react_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../react/utils */ "./react/utils.js");


 // import { getReactTree } from '../react/utils';

class DeleteButton extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  render() {
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', {
      class: 'button',
      onClick: this.props.deleteHandler
    }, ['X']);
  }

}

class List extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteHandler(this.props.index);
  }

  render() {
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'list'
    }, [(0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'todo'
    }, [this.props.todo, (0,_react_utils__WEBPACK_IMPORTED_MODULE_2__.getReactTree)(DeleteButton, {
      deleteHandler: this.handleDelete
    })])]);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./src2/main.js":
/*!**********************!*\
  !*** ./src2/main.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react/Component */ "./react/Component.js");
/* harmony import */ var _react_CreateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/CreateElement */ "./react/CreateElement.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src2/list.js");
/* harmony import */ var _inputbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputbox */ "./src2/inputbox.js");
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./counter */ "./src2/counter.js");
/* harmony import */ var _react_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../react/utils */ "./react/utils.js");


 // import { getReactTree } from '../react/utils';





class Main extends _react_Component__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor() {
    super();
    this.state = {
      value: '',
      todoList: ["Todo 1"]
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  } // shouldComponentUpdate() {
  //     console.log("A: ");
  //     return false;
  // }


  clickHandler() {
    // console.log("E: ", this);
    this.setState({
      todoList: [...this.state.todoList, this.state.value],
      value: '3'
    });
  }

  changeHandler(evt) {
    this.setState({
      value: evt.target.value
    }); // console.log("E: ", evt, evt.target.value)
  }

  deleteHandler(index) {
    const newList = [...this.state.todoList];
    newList.splice(index, 1);
    console.log("Delete", index);
    this.setState({
      todoList: newList
    });
  } // styled(type, value) {
  //     console.log('AX: ', type, value);
  //     return 2;
  // }


  render() {
    return (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'container'
    }, (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'wrapper'
    }, [(0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'bottom'
    }, (0,_react_utils__WEBPACK_IMPORTED_MODULE_5__.getReactTree)(_counter__WEBPACK_IMPORTED_MODULE_4__.default, {}) // <Counter />
    ), (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'top'
    }, [(0,_react_utils__WEBPACK_IMPORTED_MODULE_5__.getReactTree)(_inputbox__WEBPACK_IMPORTED_MODULE_3__.default, {
      value: this.state.value,
      changeHandler: this.changeHandler
    }), // <Inputbox value={} />
    (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', {
      class: 'button',
      onClick: this.clickHandler
    }, 'Click')]), // createElement('div', { class: 'bottom' },
    //     [this.state.value]
    // ),
    (0,_react_CreateElement__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', {
      class: 'bottom'
    }, this.state.todoList.map((todo, index) => (0,_react_utils__WEBPACK_IMPORTED_MODULE_5__.getReactTree)(_list__WEBPACK_IMPORTED_MODULE_2__.default, {
      todo,
      deleteHandler: this.deleteHandler,
      index
    })))]));
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map