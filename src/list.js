import Component from '../react/Component';
import { createElement } from '../react/CreateElement';
import { getReactTree } from '../react/utils';
// import { getReactTree } from '../react/utils';

class DeleteButton extends Component {
    render() {
        return createElement('span', {class: 'button', onClick: this.props.deleteHandler}, [
            'X'
        ]);
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.deleteHandler(this.props.index);
    }

    render() {
        return createElement('div', {class: 'list'}, [
            createElement('div', {class: 'todo'} , [
                this.props.todo,
                this.getReactTree(DeleteButton, {deleteHandler: this.handleDelete})
            ])
            
        ]);
    }
}

export default List;