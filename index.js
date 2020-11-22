import ReactDom from './react/ReactDom';
import { getReactTree } from './react/utils';
import Main from './src/main';

const main = new Main();

ReactDom.renderDom(
    getReactTree(Main), // <Main />
    document.getElementById('app'),
    Main
)