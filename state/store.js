import { action, computed, observable } from 'mobx';
import xmlStringify from 'xml-stringify';
import xmlBeautifier from 'xml-beautifier';

import { initialTree, debugTree, xmlParseExtra } from './misc-data';
import { ipsum } from './ipsum';

class Store {
    @observable xml = {
        tree: {...initialTree}
    };
    @observable debug = __DEV__ ? 1 : 0;

    @computed get markup() {
        let output;

        try {
            output = xmlBeautifier(xmlStringify(this.xml.tree));
        }
        catch (e) {
            output = `Error: ${e}`;
        }
        return output;
    }

    @action changeInput(e) {
        let input = e.target.value;
        let newTree = xmlParseExtra(input);
        if (newTree.root) {
            this.xml.tree = newTree;
        }
    }

    @action ipsumize() {
        ipsum(this.xml.tree.root);
    }
}

let store = new Store;

if (__DEV__) {
    window.store = store;
    store.xml.tree = debugTree;
}

export default store;