import Component from '../react/Component';
import React, { createElement } from '../react/CreateElement';
import List from './list';
// import { getReactTree } from '../react/utils';
import InputBox from './inputbox';
import Counter from './counter';
import { getReactTree } from '../react/utils';

class Main extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            todoList: ["Todo 1"],
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    // shouldComponentUpdate() {
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
        });
        // console.log("E: ", evt, evt.target.value)
    }

    deleteHandler(index) {
        const newList = [...this.state.todoList];
        newList.splice(index, 1)
        console.log("Delete", index)
        this.setState({
            todoList: newList,
        });

    }

    // styled(type, value) {
    //     console.log('AX: ', type, value);
    //     return 2;
    // }

    render() {

        return createElement('div', { class: 'container' },
            createElement('div', { class: 'wrapper' },
                [
                    createElement('div', { class: 'bottom' },
                    getReactTree(Counter, {}), // <Counter />
                    ),
                    createElement('div', { class: 'top' },
                        [
                            getReactTree(InputBox, { value: this.state.value, changeHandler: this.changeHandler }), // <Inputbox value={} />
                            createElement('button', { class: 'button', onClick: this.clickHandler }, 'Click')
                        ]
                    ),
                    // createElement('div', { class: 'bottom' },
                    //     [this.state.value]
                    // ),
                    createElement('div', { class: 'bottom' },
                        this.state.todoList.map((todo, index) => getReactTree(List, { todo, deleteHandler: this.deleteHandler, index }))
                    )
                ]
            )

        );
    }
}

export default Main;