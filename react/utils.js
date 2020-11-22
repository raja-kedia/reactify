const baseRef = {}
export function getReactTree(elem, args, parent) {
    const parentContext = parent || baseRef // if no parent then take baseRef
    const childPosition = (parent && parentContext.__childSequence) || 0
    const uniqueKey = elem.name + '__' + childPosition
    const comp = (parentContext.__childrens && parentContext.__childrens[uniqueKey]) || new elem(args)
    if (!parentContext.__childrens) parentContext.__childrens = {}
    parentContext.__childrens[uniqueKey] = comp
    comp.__childSequence = 0 // reset for proper rendering of comp childs
    parentContext.__childSequence = childPosition + 1;
    console.log("Context", parentContext)
    return comp.getJSX()
}

// export function getJSXwithNewState(elem, args) {
//     return (new elem(args)).getJSXwithNewState()
// }
