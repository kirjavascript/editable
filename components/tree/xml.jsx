import { observer } from 'mobx-react';

import styles from './styles.scss';

import { Colour, SASSVars } from '../ui/index';
import { Attributes } from './attributes.jsx';
import Tree from './index.jsx';
import Options from './options.jsx';

@observer
class XML extends React.Component {

    constructor(props) {
        super(props);

        let { node } = this.props;

        this.state = {
            hover: 0
        };

        this.enter = (e) => {
            e.stopPropagation();
            this.setState({hover:1});
        };
        this.leave = (e) => {
            e.stopPropagation();
            this.setState({hover:0});
        };
    }

    render() {
        let { node } = this.props;

        return <div className={styles.node}>

            <XMLTag
                hover={this.state.hover}
                enter={this.enter}
                leave={this.leave}
                node={node}>

                {/* children / content */}
                <div className={styles.children}>
                    {node.children.map((child,i) => (
                        <Tree key={i} node={child}/>
                    ))}
                    {node.content}
                </div>

            </XMLTag>

        </div>;
    }

}

const XMLTag = (props) => {
    let { node } = props;
    let kids = !!node.children.length || node.content;

    return <span>
        {/* start tag / attributes */}
        <span onMouseOver={props.enter} onMouseOut={props.leave}>
            &lt;
            <Colour is="red" bold={true}>{node.name}</Colour>
            {!props.hideOptions && <Options show={props.hover} node={node}/>}
            <Attributes attrs={node.attributes}/>
            {!kids && '/'}
            &gt;
        </span>          

            {props.children}

        {/* closing tag */}
        {kids && <span>
            &lt;/<Colour is="red" bold={true}>{node.name}</Colour>&gt;
        </span>}
    </span>;
};

export { XMLTag };
export default XML;