import styles from './styles.scss';
import { Colour, Icon } from '../ui/index';

import {
    setEditable,
    getEditableTypes,
    typeList,
    clearEditables,
    deleteEditable
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
            deleteEditable(node);
        };

        this.xml = () => {
            node.php.keepTag = !node.php.keepTag;
        };

        this.block = () => {
            setEditable(node, 'block');
        };
    }

    render() {
        let { show, node } = this.props;
        let { php } = node;

        let editTypes = getEditableTypes(node.tag);
        let numTypes = editTypes.length + 1;
        let motion = {stiffness:150, damping:15};

        return do {
            if (php.enabled) {
                <span 
                    className={styles.options}
                    style={{marginLeft:5}}>

                    <Icon
                        type="xml"
                        title="toggle enclosing tag"
                        onClick={this.xml}/>
                    <Icon type="remove" onClick={this.delete}/>

                </span>;

            }
            else {
                <span 
                    className={styles.options}>

                    {editTypes.map((type) => (
                        <Icon
                            key={type}
                            type={type}
                            onClick={this[type]}/>
                    ))}

                    <Icon type="block" onClick={this.block}/>

                </span>;
            }
        };
    }

}

export default Options;