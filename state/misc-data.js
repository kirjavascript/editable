import xmlParse from 'xml-parser';

let initialTree = {'root':{'name':'xml','attributes':{},'children':[]}};

let debugTree = xmlParseExtra(`
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20">
        <p> Paragraph of text </p>
      <path fill="#fff" d="M9 9L1.4.4C1.2 0 .7 0 .3.3c-.4.2-.4.7 0 1L7 9.8.3 18c-.3.4-.3 1 0 1.2.5.3 1 .3 1.3 0L9 10v-.5V9"/>
    </svg>
`);

function xmlParseExtra(str) {
    let tree = xmlParse(str);
    tree.root && addExtra(tree.root);
    return tree;
}

function addExtra(node) {
    Object.assign(node, {
        php: {
            enabled: 0,
            editable: ''
        }
    });
    node.children.forEach(addExtra);
}

export {
    initialTree,
    debugTree,
    xmlParseExtra
};