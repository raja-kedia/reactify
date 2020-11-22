import { createElement, createDomElement } from "./CreateElement"

const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
const UPDATE = 'UPDATE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE_PROP'

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        typeof node1 === 'number' && node1 !== node2 ||
        node1.type !== node2.type
}

function diffProps(newNode, oldNode) {
    const patches = []
    const props = Object.assign({}, newNode.attr, oldNode.attr)
    Object.keys(props).forEach(name => {
        const newVal = newNode.attr[name]
        const oldVal = oldNode.attr[name]
        if (typeof oldVal === 'function') {

        } else
            if (!newVal) {
                patches.push({ type: REMOVE_PROP, name, value: oldVal })
            } else if (!oldVal || newVal !== oldVal) {
                patches.push({ type: SET_PROP, name, value: newVal })
            }
    })
    return patches
}

function diffChildren(newNode, oldNode) {
    const patches = []
    const patchesLength = Math.max(
        newNode.children.length,
        oldNode.children.length
    )
    for (let i = 0; i < patchesLength; i++) {
        const d = diff(
            newNode.children[i],
            oldNode.children[i]
        );
        d ? patches.push(d) : ''
    }
    return patches
}

export function diff(newNode, oldNode) {
    // @Todo:  it fails when oldNode = 0
    if (oldNode === undefined || oldNode === null) {
        return { type: CREATE, newNode }
    }
    if (oldNode === undefined || oldNode === null) {
        return { type: REMOVE }
    }
    if (changed(newNode, oldNode)) {
        return { type: REPLACE, newNode }
    }
    if (newNode.type) {
        return {
            v: newNode.type,
            type: UPDATE,
            attr: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode),
        }
    }
}

function setProp(target, name, value) { //@
    // if (name === 'className') {
    //     return target.setAttribute('class', value)
    // }
    if (name === 'value') {
        return target.value = value;
    }
    target.setAttribute(name, value)
}


// Start with the last line,
// then className
function removeProp(target, name, value) {
    // if (name === 'className') {
    //     return target.removeAttribute('class')
    // }
    target.removeAttribute(name)
}

function patchProps(parent, patches) {
    for (let i = 0; i < patches.length; i++) {
        const propPatch = patches[i]
        const { type, name, value } = propPatch
        if (type === SET_PROP) {
            setProp(parent, name, value)
        }
        if (type === REMOVE_PROP) {
            removeProp(parent, name, value)
        }
    }
}

export function patch(parent, patches, index = 0) { //@
    if (!patches) { return }
    const el = parent.childNodes[index]
    // console.log("EL: ", el, patches);
    switch (patches.type) {
        case CREATE: {
            const { newNode } = patches
            const newEl = createDomElement(newNode)
            return parent.appendChild(newEl)
        }
        case REMOVE: {
            return parent.removeChild(el)
        }
        case REPLACE: {
            const { newNode } = patches
            const newEl = createDomElement(newNode)
            return parent.replaceChild(newEl, el)
        }
        case UPDATE: {
            const { attr, children } = patches
            const rep = el.cloneNode();
            patchProps(rep, attr)
            
            // if(patches.v === 'input') {
            //     // const newEl = createDomElement({type: patches.type, })
            //     return parent.replaceChild(rep, el)
            // }

            for (let i = 0; i < children.length; i++) {
                patch(el, children[i], i)
            }
        }
    }
}

function updateInput(patches) {
    if(patches.type === 'input') {
        return parent.replaceChild(newEl, el)
    }
}