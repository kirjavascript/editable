import { observer } from 'mobx-react';

import styles from './styles.scss';

import { Colour } from '../ui/index';

@observer
class Attributes extends React.Component {

    render() {
        let { attrs } = this.props;
        if (!attrs) return false;
        let keys = Object.keys(attrs);

        return <span>
        {keys.map((key) => {
            let value = attrs[key];
            return <span key={key}>
                &nbsp;
                <Colour is="orange">{key}</Colour>
                =
                {value.length > 50 ? 
                    <Colour is="green">
                        {'"'}<Colour is="purple">...</Colour>{'"'}
                    </Colour>
                    :
                    <Colour is="green">
                        {'"'}{value}{'"'}
                    </Colour>}
            </span>;
        })}
        </span>;
    }
}



export { Attributes };