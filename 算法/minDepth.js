var minDepth = function (root) {
    if (!root) {
        return 0
    };
    const q = [
        [root, 1]
    ];
    while (q.length) {
        const [n, level] = q.shift();
        console.log(n.val, level);
        if (!n.left && !n.right) {
            return level
        }
        if (n.left) q.push([n.left, level + 1]);
        if (n.right) q.push([n.right, level + 1]);
    }
};