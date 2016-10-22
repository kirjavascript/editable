import store from './store';

function setEditable(node, type, cache) {

    node.php.enabled = 1;
    // calculate name
    if (node.php.editable != type) {
        node.php.editable = type;
        let className = node.attributes.class ? `_${node.attributes.class}`:'';
        let base = `${type}${className}`;

        let str = base, num = 1;
        while(~store.nameCache.indexOf(str)) {
            num++;
            str = `${base}_${num}`;
        }
        node.php.name = str;
        store.nameCache.push(str);
    }

    if (~typeList.indexOf(type)) {
        node.php.config = {};
        configGenerator[type](node);
        if (~contentTags.indexOf(node.name)) {
            node.php.keepTag = true;
        }
    }
    else {
        node.php.config = {};
    }
}

function setMultiple(tag, type, node) {
    if (node) {
        if (node.name == tag) {
            setEditable(node, type);
        }
        node.children.forEach((child) => {
            setMultiple(tag, type, child);
        });
    }
    else {
        setMultiple(tag, type, store.xml.tree.root);
    }
}

function resetEditables({node}) {
    if (node) {
        node.php && (node.php.enabled = 0);
        node.children.forEach((node) => {
            resetEditables({node});
        });
    }
    else {
        resetEditables({node: store.xml.tree.root});
    }
}

function getEditableTypes(name) {
    // keep tag flag (!)
    let obj = editableTypes.find((d) => ~d.tags.indexOf(name));
    return obj ? obj.types : [];
}

let configGenerator = {
    image(node) {
        let title = node.attributes.title || node.attributes.alt;

        let config = {
            attributes: {
                'class': node.attributes.class
            }
        };

        title && (config = {...config, title});

        node.php.config = config;
    },
    input(node) {
        node.php.config = {
            placeholder: node.content
        };
    },
    wysiwyg(node) {},
    link(node) {
        node.php.config = {...node.attributes};
        delete node.php.config.href;
    },
    select(node) {
        let store = node.children
            .filter((d)=>d.name=='option')
            .map((d) => ([d.attributes.value, d.content]));

        node.php.config = { 
            store, 'class': node.attributes.class
        };
    }
};

let typeList = Object.keys(configGenerator); 

let editableTypes = [
    { types: ['input'], tags: ['h1','h2','h3','h4','h5','h6']},
    { types: ['wysiwyg', 'input'], tags: ['p','span']},
    { types: ['image'], tags: ['img']},
    { types: ['select'], tags: ['select']},
    { types: ['link'], tags: ['a']},
];

let contentTags = ['h1','h2','h3','h4','h5','h6','span'];

let allTags = [].concat(...editableTypes.map((d) => d.tags)).reverse();

export {
    setEditable,
    getEditableTypes,
    resetEditables,
    setMultiple,
    typeList,
    allTags,
};