import { render } from 'react-dom';
import { observer } from 'mobx-react';

import styles from './root.scss';
import store from '../state/store';
import { 
    allTags,
    getEditableTypes,
    setMultiple,
    resetEditables
} from '../state/editables';

import Tree from './tree/index.jsx';

@observer
class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            multiTag: '',
            savedClipboard: 0
        };

        this.pickTag = (e) => {
            this.setState({multiTag:e.target.value});
        };

        this.pickType = (e) => {
            setMultiple(this.state.multiTag, e.target.value);
            this.setState({multiTag:''});
        };

        this.saveClipboard = () => {
            let clipboard = document.querySelector(`.${styles.clipboard}`);
            clipboard.select();
            document.execCommand('copy');
            clipboard.blur();
            this.setState({savedClipboard:1});
            setTimeout(()=> {
                this.setState({savedClipboard:0});
            }, 1000);
        };

        this.setPrefix = (e) => {
            store.prefix = e.target.value;
        };
    }

    render() {
        let { store } = this.props;
        let { multiTag } = this.state;

        let editableTypes;

        if (multiTag) {
            editableTypes = getEditableTypes(multiTag);
        }

        return <div>

            <Tree content={store.xml.tree}/>

            <input
                className={styles.input}
                placeholder="Paste XML..."
                value=""
                onChange={store::store.changeInput}/>
    
            <div className={styles.menu}>
                <input
                    type="text"
                    value={store.prefix}
                    onChange={this.setPrefix}
                    placeholder="Prefix..."/>
                <button>
                    add all tags / block
                </button>
                <div style={{position:'relative'}}>
                    {multiTag && <select
                        value=""
                        className={styles.editableType}
                        onChange={this.pickType}>
                        <option value="">Editable</option>
                        {editableTypes.map((type, i) => <option key={i} value={type}>
                            {type}
                        </option>)}
                    </select>}
                    <select
                        style={{
                            width: multiTag?85:null,
                            marginLeft: multiTag?90:null
                        }}
                        value={multiTag}
                        onChange={this.pickTag}>
                        <option value="">Set Multiple Tags</option>
                        {allTags.map((tag, i) => <option key={i} value={tag}>
                            {tag}
                        </option>)}
                    </select>
                </div>
                <button onClick={store::store.ipsumize}>
                    Ipsumize Content
                </button>
                <button onClick={resetEditables}>
                    Reset Editables
                </button>
                <button onClick={store::store.clearCache}>
                    Reset Name Cache
                </button>
                <button onClick={this.saveClipboard}>
                    {this.state.savedClipboard?'Copied!':'Copy To Clipboard'}
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