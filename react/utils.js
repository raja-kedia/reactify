export function getReactTree(elem, args) {
    
    // let key = 'root';
    // if(con && con.key) {
    //     key = con.key;
    // }
    // console.log("P: ", key);

    let dom = null;
    if(!dom) {
        dom = new elem(args);
    }

    return (new elem(args)).getJSX()
}

// export function getJSXwithNewState(elem, args) {
//     return (new elem(args)).getJSXwithNewState()
// }