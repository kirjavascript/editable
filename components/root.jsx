import { render } from 'react-dom';
import { observer } from 'mobx-react';

import styles from './root.scss';
import store from '../state/store';
import { allTags } from '../state/editables';

import Tree from './tree/index.jsx';

function saveClipboard() {
    let clipboard = document.querySelector(`.${styles.clipboard}`);
    clipboard.select();
    document.execCommand('copy');
    clipboard.blur();
    store.savedClipboard = 1;
    setTimeout(()=> {
        store.savedClipboard = 0;
    }, 1000);
}

@observer
class Root extends React.Component {

    

    render() {
        let { store } = this.props;

        return <div>

            <Tree node={store.xml.tree.root}/>

            <input
                className={styles.input}
                placeholder="Paste XML..."
                value=""
                onChange={store::store.changeInput}/>
                
            <div className={styles.menu}>
                <button>
                    add all tags / block
                </button>
                <select>
                    <option>Set Multiple Tags</option>
                    {allTags.map((tag, i) => <option key={i} value={tag}>
                        {tag}
                    </option>)}
                </select>
                <button onClick={store::store.ipsumize}>
                    Ipsumize Content
                </button>
                <button onClick={store::store.clearCache}>
                    Reset Name Cache
                </button>
                <button onClick={saveClipboard}>
                    {store.savedClipboard?'Copied!':'Copy To Clipboard'}
                </button>
                <a href="http://kirjava.xyz" target="_blank">
                    <button>More Stuff</button>
                </a>
            </div>

            <textarea
                className={styles.clipboard}
                value={store.markup}
                readOnly={true}/>

            {!!store.debug && <pre ref="debug" className={styles.debug}>
                {store.markup}
                {`\n\n\n`}
                {JSON.stringify(store.xml.tree,null,4)}
            </pre>}

        </div>;
    }

}

render(<Root store={store}/>, document.querySelector('#root'));

// scheme
// xml, php, motion
// tag slides out to icons?

// pImporter