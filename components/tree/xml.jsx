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

        return <div 
                onMouseOver={this.enter}
                onMouseOut={this.leave}
                className={styles.node}>

            <XMLTag
                hover={this.state.hover}
                node={node}>

                <Tree content={node.content}/>

            </XMLTag>

        </div>;
    }

}

const XMLTag = (props) => {
    let { node } = props;
    let kids = !!node.content.length;

    return <span>
        {/* start tag / attributes */}
        <span>
            &lt;
            <Colour is="red" bold={true}>{node.tag}</Colour>
            {!props.hideOptions && <Options show={props.hover} node={node}/>}
            <Attributes attrs={node.attrs}/>
            {!kids && '/'}
            &gt;
        </span>          

            <div className={styles.children}>
                {props.children}
            </div>

        {/* closing tag */}
        {kids && <span>
            &lt;/<Colour is="red" bold={true}>{node.tag}</Colour>&gt;
        </span>}
    </span>;
};

export { XMLTag };
export default XML;