import parser from 'posthtml-parser';
import render from 'posthtml-render';
import xmlBeautifier from 'xml-beautifier';

let initialTree = xmlParse(`

    <!-- pimcore editable editor -->
    <section>
        <h1 class="heading"> Title </h1>
        <p class="paragraph"> Paragraph of text </p>
        <p class="paragraph"> Paragraph of text </p>
        <a href="http://www.google.com" class="hyper">Google</a>
        <img class="image" src="/img/test" alt="title"/>
    </section>
    <section>
        <select class="choose">
            <option value="value1">text1</option>
            <option value="value2">text2</option>
        </select>
    </section>

`);

/*

*/

// input

function xmlParse(str) {
    let tree = parser(str);
    tree = removeWhitespace(tree);
    tree = addPHPAttrs(tree);

    return tree;
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

// output

function getOutput(tree) {
    let treeClone = JSON.parse(JSON.stringify(tree));
    tree = addEditableMarkup(treeClone);
    let rendered = render(tree, { closingSingleTag: 'slash' });
    return phpBeautifier(rendered);
}

function addEditableMarkup(content) {

    return content.map((node) => {
        if (node.php && node.php.enabled) {
            let { editable, name, config, keepTag } = node.php;
            // block
            if (editable == 'block') {
                let blockStart = `<?php while($this->block("${name}")->loop()) : ?>`;
                let blockEnd = '<?php endwhile; ?>';
                node.tag = '__PHP_INDENT__';
                node.attrs = {};
                node.content.unshift(blockStart);
                node.content.push(blockEnd);
                node.content = addEditableMarkup(node.content);
                return node;
            }
            // other editables
            else {
                let phpStr = `<?= $this->${editable}("${name}"${PHPObject(config)}) ?>`;

                if (keepTag) {
                    node.content = [phpStr];
                    return node;
                }
                else {
                    return phpStr;
                }
            }

        }
        else if (node.content) {
            node.content = addEditableMarkup(node.content);
            return node;
        }
        else {
            return node;
        }
    });

}

function phpBeautifier(str) {
    str = str
        .replace(/<\?/gm,'__PHP_START__')
        .replace(/\?>/gm,'__PHP_END__');

    str = xmlBeautifier(str);

    str = str
        .replace(/__PHP_START__/gm,'<?')
        .replace(/__PHP_END__/gm,'?>')
        .replace(/<__PHP_INDENT__>\n( *)/gm,'')
        .replace(/ {4}(.*?)\n( *?)<\/__PHP_INDENT__>/gm,(match,group) => {
            return group;
        });

    return str;
}


function PHPObject(config) {
    let str = JSON.stringify(config);
    if (str == '{}') {
        return '';
    }
    else {
        return ', ' + str
            .replace(/:/gmi,' => ')
            .replace(/\n/gmi,' ')
            .replace(/{/gmi,'[')
            .replace(/}/gmi,']');
    }
}

export {
    initialTree,
    xmlParse,
    getOutput
};