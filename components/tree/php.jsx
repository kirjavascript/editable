import { observer } from 'mobx-react';

import styles from './styles.scss';

import { Colour } from '../ui/index';
import { XMLTag } from './xml.jsx';
import Options from './options.jsx';

@observer
class PHP extends React.Component {

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
            className={styles.node}
            onMouseOver={this.enter}
            onMouseOut={this.leave}>

            { do {
                if (node.php.keepTag) {
                    <XMLTag
                        hover={false}
                        hideOptions={true}
                        node={node}>
                        <PHPTag hover={this.state.hover} node={node}/>
                    </XMLTag>;
                }
                else {
                    <PHPTag hover={this.state.hover} node={node}/>;
                }
            }}
        </div>;
    }
}

const PHPTag = (props) => {

    let { node } = props;
    let { php } = node;

    return <span>

        <Colour is="red">{'<?='}</Colour>
        <Options show={props.hover} node={node}/>
        <Colour is="red" bold={true}> $this</Colour>
        {`->${php.editable}(`}
            <Colour is="green">{`'${props.node.php.name}'`}</Colour>
            <PHPObject config={php.config} root={true}/>
        {')'}
        <Colour is="red"> {'?>'}</Colour>

    </span>;
};

const PHPObject = (props) => {
    let keys = Object.keys(props.config);
    
    return !!keys.length && <span>
        {props.root && ','} [
        {keys.map((key,i) => {
            let config = props.config[key];
            let configString = JSON.stringify(config);
            let configClone = JSON.parse(configString);
            let configArray = do {
                if (Array.isArray(configClone)) {
                    configString.split(/(\[|\]|\,)/g).filter((d)=>d);
                }
                else null;
            };
            return <span key={key}>
                <Colour is="green">{`"${key}"`}</Colour>
                {' => '}
                {do {
                    if (configArray) {
                        <PHPArray config={configArray}/>;
                    }
                    else if (typeof configClone == 'object') {
                        <PHPObject config={configClone}/>;
                    }
                    else {
                        <Colour is="green">{`"${config.trim()}"`}</Colour>;
                    }
                }}
                {i != keys.length-1 && ', '}
            </span>;
        })}
        ]
    </span>;
};

const PHPArray = (props) => <span>
    {props.config.map((text, i) => {
        let colour = ~['[',']',','].indexOf(text) ? 'white' : 'green';
        return <Colour key={i} is={colour}>
            {text == ',' ? ', ' : text} 
        </Colour>;
    })}
</span>;

export default PHP;