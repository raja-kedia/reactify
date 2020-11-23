import Component from '../react/Component';
import { createElement } from '../react/CreateElement';
import { getReactTree } from '../react/utils';
// import { getReactTree } from '../react/utils';

class AddButton extends Component {
    render() {
        return createElement('span', {class: 'button', onClick: this.props.increment}, [
            '+'
        ]);
    }
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        }
        this.increment = this.increment.bind(this);
    }

    increment() {
        console.log("A: add ", this);
        this.setState({
            value: this.state.value + 1
        })
    }
    render() {
        console.log("A Counter Render: ", this);
        return createElement('div', { class: 'list' }, [
            createElement('div', {class: 'todo'} , [
                this.state.value,
                this.getReactTree(AddButton, {increment: this.increment})
            ])
        ]);
    }
}

export default Counter;