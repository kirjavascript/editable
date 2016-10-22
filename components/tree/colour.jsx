import SASSVars from '!!sass-variables!../variables.scss';

const Colour = (props) => (
    <span style={{
        color:SASSVars[props.is],
        fontWeight: props.bold ? 900 : 400
    }} {...props}>
        {props.children}
    </span>
);

export {
    Colour
};