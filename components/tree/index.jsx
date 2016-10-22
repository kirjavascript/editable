import { observer } from 'mobx-react';

import styles from './styles.scss';
import { Colour, SASSVars } from '../ui/index';

import XML from './xml.jsx';
import PHP from './php.jsx';


@observer
class Tree extends React.Component {

    constructor(props) {
        super(props);

        let { node } = this.props;
    }

    render() {
        let { node } = this.props;
        let php = node.php.enabled;

        return do {
            if (php) {
                <PHP node={node}/>;
            }
            else {
                <XML node={node}/>;
            }
        };
    }
}

export default Tree;