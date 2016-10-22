import { action, computed, observable } from 'mobx';

import {

    initialTree,
    xmlParseExtra,
    getOutput

} from './xml';

import { ipsum } from './ipsum';

class Store {
    debug = __DEV__ ? 1 : 0;
    @observable xml = {
        tree: {...initialTree}
    };
    @observable nameCache = [];
    @observable savedClipboard = 0;

    @computed get markup() {
        let output;

        try {
            output = getOutput(this.xml);
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

    @action clearCache() {
        this.nameCache.replace([]);
    }

    @action ipsumize() {
        ipsum(this.xml.tree.root);
    }
}

let store = new Store;

if (__DEV__) {
    window.store = store;
}

export default store;