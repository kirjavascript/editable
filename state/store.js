import { action, computed, observable } from 'mobx';

import {

    initialTree,
    xmlParse,
    getOutput

} from './xml';

import { ipsum } from './ipsum';

class Store {
    debug = __DEV__ ? 1 : 0;
    @observable xml = {
        tree: initialTree
    };
    @observable nameCache = [];
    @observable savedClipboard = 0;
    @observable prefix = '';

    @computed get markup() {
        let output;

        try {
            output = getOutput(this.xml.tree);
        }
        catch (e) {
            output = `Error: ${e}`;
        }
        return output;
    }

    @action changeInput(e) {
        let input = e.target.value;
        let newTree = xmlParse(input);
        this.xml.tree = newTree;
    }

    @action clearCache() {
        this.nameCache.replace([]);
    }

    @action ipsumize() {
        this.xml.tree = ipsum(this.xml.tree);
    }
}

let store = new Store;

if (__DEV__) {
    window.store = store;
}

export default store;