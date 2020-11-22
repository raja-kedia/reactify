
function isEvent(attr) {
    const evet = [
        'onClick',
        'onChange',
        'onKeyUp',
        // 'value'
    ];
    if (evet.indexOf(attr) > -1) {
        return true;
    }
    return false;
}

export function createElement(type, attr, children = []) {
    if (!Array.isArray(children)) {
        children = [children];
    }
    const el = {
        type,
        attr,
        // dataid: `${type}`,
        children
    }
    return el;
}

export function createDomElement(node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node)
    }

    const { type, attr, children } = node;
    const el = document.createElement(type);
    Object.keys(attr).map((atr) => {
        if (isEvent(atr)) {
            el[atr.toLowerCase()] = attr[atr];
        } else {
            el.setAttribute(atr, attr[atr]);
        }
    });
    if(!children) {
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
}

export default React;