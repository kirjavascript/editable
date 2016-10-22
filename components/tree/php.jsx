import { observer } from 'mobx-react';

import styles from './styles.scss';

import { Colour } from './colour.jsx';

const PHP = observer((props) => {
    let { node } = props;
    let { php } = node;

    return <div className={styles.node}>
        <Colour is="red">{'<?='} </Colour>
        <Colour is="red" bold={true}>$this</Colour>
        {`->${php.editable}(`}

        {')'}
        <Colour is="red"> {'?>'}</Colour>
    </div>;
});



export default PHP;