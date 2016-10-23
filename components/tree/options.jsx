import { Motion, spring } from 'react-motion';

import styles from './styles.scss';
import { Colour, Icon } from '../ui/index';

import {
    setEditable,
    getEditableTypes,
    typeList,
    clearEditables
} from '../../state/editables';

class Options extends React.Component {

    constructor(props) {
        super(props);

        let { node } = this.props;

        typeList.forEach((type) => {
            this[type] = () => {
                setEditable(node, type);
            };
        });

        this.delete = () => {
            node.php.enabled = 0;
        };

        this.xml = () => {
            node.php.keepTag = !node.php.keepTag;
        };
    }

    render() {
        let { show, node } = this.props;
        let php = node.php.enabled;

        let editTypes = getEditableTypes(node.name);
        let numTypes = editTypes.length;
        let motion = {stiffness:300};

        return do {
            if (php) {
                <Motion
                    defaultStyle={{marginLeft: (-25 * 2),opacity:0}}
                    style={{
                        marginLeft: spring(show?5:(-25 * 2), motion),
                        opacity: spring(show?1:0)
                    }}>
                    {(style) => <span 
                        className={styles.options}
                        style={style}>

                        <Icon type="xml" onClick={this.xml}/>
                        <Icon type="delete" onClick={this.delete}/>

                    </span>}
                </Motion>;
            }
            else {
                <Motion
                    defaultStyle={{marginLeft:(-25 * numTypes),opacity:0}}
                    style={{
                        marginLeft: spring(show?(numTypes?5:0):(-25 * numTypes), motion),
                        opacity: spring(show?1:0, motion),
                    }}>
                    {(style) => <span 
                        className={styles.options}
                        style={{
                            ...style
                        }}>

                        {editTypes.map((type) => (
                            <Icon
                                key={type}
                                type={type}
                                onClick={this[type]}/>
                        ))}

                    </span>}
                </Motion>;
            }
        };
    }

}

// <Icon type="input"/>
// <Icon type="image"/>
// <Icon type="dropdown"/>
// <Icon type="button"/>
export default Options;