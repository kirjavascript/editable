import { observer } from 'mobx-react';

import styles from './styles.scss';
import { Colour } from './colour.jsx';

import XML from './xml.jsx';
import PHP from './php.jsx';


@observer
class Tree extends React.Component {

    constructor(props) {
        super(props);

        let { node } = this.props;

        // this.setPHP = () => {
        //     node.php.enabled = node.php.enabled^1;
        //     node.php.editable = 'wysiwyg';
        // };

        this.state = {
            hover: 0
        };

        this.enter = (e) => {
            e.stopPropagation();
            console.log('asd');
            this.setState({hover:1});
        };
        this.leave = (e) => {
            e.stopPropagation();
            this.setState({hover:0});
        };
    }

    render() {
        let { node } = this.props;
        let kids = !!node.children.length || node.content;
        let php = node.php.enabled;

        return <span
            onMouseOver={this.enter}
            onMouseOut={this.leave}>

            {do {
                if (php) {
                    <PHP node={node} hover={!!this.state.hover}/>;
                }
                else {
                    <XML node={node} hover={!!this.state.hover}/>;
                }
            }}

        </span>;
    }
}

export default Tree;