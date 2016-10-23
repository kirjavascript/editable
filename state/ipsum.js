let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function ipsum(content) {

    return content.map((node) => {

        if (typeof node == 'string') {
            if (/<!--/.test(node)) {
                return node;
            }
            else {
                let count = node.trim().split(' ').length;

                return lorem.split(' ').splice(0,count).join` `;
            }
        }
        else {
            node.content = ipsum(node.content);
            return node;
        }

    });

}

export {
    ipsum
};