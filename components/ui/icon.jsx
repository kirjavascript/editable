import styles from './styles.scss';

const Icon = (props) => <img
    className={styles.icon}
    src={require(`./icons/${props.type}.svg`)}
    alt={props.type}
    title={props.title || props.type}
    {...props}/>;

export default Icon;