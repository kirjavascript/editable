import { observer } from 'mobx-react';

import styles from './styles.scss';

import { Colour } from './colour.jsx';
import { Attributes } from './attributes.jsx';
import Tree from './index.jsx';
import Options from './options.jsx';

@observer
class XML extends React.Component {

    render() {
        let node = this.props.node;
        let kids = !!node.children.length || node.content;

        return <span className={styles.node}>

            {/* start tag / attributes */}
            &lt;
            <Colour is="red" bold={true}>{node.name}</Colour>
            <Options show={this.props.hover} node={node}/>
            <Attributes attrs={node.attributes}/>
            {!kids && '/'}
            &gt;            

            {/* children / content */}
            <div className={styles.children}>
                {node.children.map((child,i) => (
                    <Tree key={i} node={child}/>
                ))}
                {node.content}
            </div>

            {/* closing tag */}
            {kids && <div>
                &lt;/<Colour is="red" bold={true}>{node.name}</Colour>&gt;
            </div>}
        </span>;
    }

}

export default XML;