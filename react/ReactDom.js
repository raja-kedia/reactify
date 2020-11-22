
import { RerenderListener } from './pubsub';
import { getReactTree } from './utils';
// import Main from '../src/main';
import { createDomElement } from './CreateElement';
import { diff, patch } from './diffandpatch';

function oldtreeUtil() {
    let oldT = {};
    return {
        setOldtree: (tree) => oldT = tree,
        getOldtree: () => oldT

    }
}

const TreeUtil = oldtreeUtil();

export function renderDom(reactElem, container, MainElem) {
    RerenderListener.subscribe('rerender', rerender.bind([container, MainElem]));
    TreeUtil.setOldtree(reactElem);

    // console.log("A: ", reactElem, );

    const initialdomTree = createDomElement(reactElem);

    container.appendChild(initialdomTree);

}

function rerender() {
    const newTree = getReactTree(this[1]);
    const oldTree = TreeUtil.getOldtree();

    const diffTree = diff(newTree, oldTree);

    console.log("Ab: ", newTree, oldTree, diffTree);

    patch(this[0], diffTree);
    TreeUtil.setOldtree(newTree);
    // oldTree = newTree;
}




export default {
    renderDom
}