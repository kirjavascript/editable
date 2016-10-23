import parser from 'posthtml-parser';
import render from 'posthtml-render';
import xmlBeautifier from 'xml-beautifier';

let initialTree = xmlParse(`
    <div>
        <h1 class="heading"> Title </h1>
        <p class="paragraph"> Paragraph of text </p>
        <p class="paragraph"> Paragraph of text </p>
        <a href="http://www.google.com" class="hyper">Google</a>
        <select class="choose">
            <option value="value1">text1</option>
            <option value="value2">text2</option>
        </select>
        <img class="bork" src="/img/test" alt="asdasd" title="asdasd"/>
    </div>
    <p class="item">
        <!-- asdasda -->
        Donate in one-off, monthly or annual amounts
        <b> test </b>
        Donate in one-off, monthly or annual amounts
        <b>test2</b>
    </p>
`);

/*



*/
function xmlParse(str) {
    let tree = parser(str);
    tree = removeWhitespace(tree);
    tree = addPHPAttrs(tree);

    return tree;
}

function getOutput(tree) {
    let treeClone = JSON.parse(JSON.stringify(tree));

    let rendered = render(treeClone);
    return xmlBeautifier(rendered);

    // wrap breautifier for php PHPSTART / PHPEND
}

function removeWhitespace(tree) {

    return !tree ? [] : tree.map((node) => {
        if (typeof node == 'string') {
            return node.trim();
        }
        else {
            node.content = removeWhitespace(node.content);
            return node;
        }
    }).filter((node) => node !== '');

}

function addPHPAttrs(tree) {

    return tree.map((node) => {
        if (typeof node == 'object') {
            node.content = addPHPAttrs(node.content);
            Object.assign(node, {
                php: {
                    enabled: 0,
                    editable: '',
                    config: {},
                    name: '',
                    keepTag: false
                }
            });
            return node;
        }
        else {
            return node;
        }
    });

}


// function xmlParseExtra(str) {
//     let tree = xmlParse(str);
//     tree.root && addExtra(tree.root);
//     return tree;
// }


// function xmlStringifyExtra(oldTree) {
//     let xml = JSON.parse(JSON.stringify(oldTree));
//     xml.tree.root && addPHPAttrs(xml.tree.root);
//     return xmlStringify(xml.tree);
// }

// function addPHPAttrs(node) {
//     if (node.php.enabled) {
//         node.attributes['data-php'] = escape(JSON.stringify(node.php));
//         node.attributes['data-tagname'] = node.name;
//         node.name = 'php';
//     }
//     node.children.forEach(addPHPAttrs);
// }

// function getOutput(oldTree) {
//     let xml = xmlBeautifier(xmlStringifyExtra(oldTree));
//     // return xml;
//     return xml.replace(/<php((.|\s)*?)(\/php>|\/>)/gim, (match) => {
//         try {
//             let escaped = /data-php="(.*?)"/gmi.exec(match)[1];
//             let obj = JSON.parse(unescape(escaped));

//             let { editable, name, config } = obj;
//             let PHPTag = `<?= $this->${editable}("${name}"${PHPObject(config)}) ?>`;
//             if (obj.keepTag) {
//                 let tagName = /data-tagname="(.*?)"/gmi.exec(match)[1];
//                 let obj = xmlParse(match);
//                 obj.root.name = tagName;
//                 delete obj.root.attributes['data-php'];
//                 delete obj.root.attributes['data-tagname'];
//                 obj.root.content = PHPTag;
//                 return xmlStringify(obj);
//             }
//             return PHPTag;
//         }
//         catch(e) {
//             return e;
//         }
//     });
// }

// function PHPObject(config) {
//     let str = JSON.stringify(config);
//     if (str == '{}') {
//         return '';
//     }
//     else {
//         return ', ' + str
//             .replace(/:/gmi,' => ')
//             .replace(/{/gmi,'[')
//             .replace(/}/gmi,']');
//     }
// }

export {
    initialTree,
    xmlParse,
    getOutput
};