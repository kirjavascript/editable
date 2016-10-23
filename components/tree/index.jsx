import { observer } from 'mobx-react';

import styles from './styles.scss';
import { Colour, SASSVars } from '../ui/index';

import XML from './xml.jsx';
import PHP from './php.jsx';


@observer
class Tree extends React.Component {

    constructor(props) {
        super(props);

        let { content } = this.props;
    }

    render() {
        let { content } = this.props;

        return <div>

            {content.map((node, i) => do {
                if (typeof node == 'string') {
                    <div key={i} className={styles.node}>{node}</div>;
                }
                else if (node.php.enabled) {
                    <PHP key={i} node={node}/>;
                }
                else {
                    <XML key={i} node={node}/>;
                }
            })}

        </div>;
    }
}

export default Tree;