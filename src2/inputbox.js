import Component from '../react/Component';
import { createElement } from '../react/CreateElement';

class InputBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return createElement('input', { class: 'text', value: this.props.value, onKeyUp: this.props.changeHandler });
    }
}

export default InputBox;