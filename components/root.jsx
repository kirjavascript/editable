import { render } from 'react-dom';
import { observer } from 'mobx-react';

import styles from './root.scss';
import store from '../state/store';

import Tree from './tree/index.jsx';

const Root = observer((props) => <div>

    <Tree node={props.store.xml.tree.root}/>

    <input
        className={styles.input}
        placeholder="Paste XML..."
        value=""
        onChange={store::props.store.changeInput}/>

    <div className={styles.menu}>
        <button onClick={store::props.store.ipsumize}>
            Ipsumize Content
        </button>
    </div>

    {!!props.store.debug && <pre className={styles.debug}>
        {JSON.stringify(props.store.xml.tree,null,4)}
        {`\n\n\n`}
        {props.store.markup}
    </pre>}

</div>);

render(<Root store={store}/>, document.querySelector('#root'));

// scheme
// xml, php, motion
// tag slides out to icons?
