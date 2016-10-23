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

        let editTypes = getEditableTypes(node.tag);
        let numTypes = editTypes.length;
        let motion = {stiffness:300};

        return do {
            if (php) {
                <span 
                    className={styles.options}
                    style={{marginLeft:5}}>

                    <Icon type="xml" onClick={this.xml}/>
                    <Icon type="delete" onClick={this.delete}/>

                </span>;
            }
            else {
                <span 
                    className={styles.options}
                    style={{marginLeft:(numTypes?5:0)}}>

                    {editTypes.map((type) => (
                        <Icon
                            key={type}
                            type={type}
                            onClick={this[type]}/>
                    ))}

                </span>;
            }
        };
    }

}

export default Options;