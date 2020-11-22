import { RerenderListener } from "./pubsub";
import React from "./CreateElement";
import { getReactTree } from './utils';

function saveState() {
    let id = {};
    return {
        getId: (key) => id[key],
        setId: (key, vid) => id[key] = vid,
        get: () => id
    }
}

const State = saveState();

export default class Component {

    // this.key;

    constructor(props, key) {
        this.props = { ...props };
        if(!this.key) {
            this.key = Math.floor(Math.random() * 100)
        } else {
            this.key = key
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    setState(newstate) {

        const key = JSON.stringify(Object.keys(this.state))

        console.log("A state : ", this, key, State.get(), this.key);

        const obj = State.getId(key);
        if(!obj) {
            State.setId(key , Object.assign({}, this.state));
        }
        
        State.setId(key , Object.assign({}, State.getId(key), newstate));

        this.state = { ...this.state, ...newstate };

        RerenderListener.publish('rerender');
    }

    getComponent() {
        return React.createDomElement(this.getJSX());
    }

    getJSX(iden) {
        if(this.state && Object.keys(this.state).length > 0 && State.getId(JSON.stringify(Object.keys(this.state)))) {
            console.log("A: ", this.state, Object.keys(this.state).length, State.getId(JSON.stringify(Object.keys(this.state))))
            this.state = {...State.getId(JSON.stringify(Object.keys(this.state)))};
        }
        return this.render();
    }

    getReactTree(elem, args) {
        // console.log("AF: ", this);
        return getReactTree(elem, args, this)
    }

    render() { }
}