import { Motion, spring } from 'react-motion';

const Options = (props) => {
    return (
    <Motion
        defaultStyle={{size: 0}}
        style={{size: spring(props.show?20:0)}}>
        {(style) => <span style={{fontSize:style.size}}>

            asd
            
        </span>}
    </Motion>
    );
};

export default Options;