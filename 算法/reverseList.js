// 双指针遍历链表
// 反转链表
const reverseList = function (head) {
    let p1 = head;
    let p2 = null;

    while (p1) {
        const tmp = p1.next;
        p1.next = p2;
        p1 = tmp;
    }

    return p2

}

// 符合栈先进后出的特点
// • 将原节点依次入栈
// • 出栈时，重新构造链表改变指向
// • 同样设置哨兵节点
// • 最后返回哨兵的next即为所求
var reverseList = function (head) {
    let tmp = head;
    let tHead = new ListNode(0);
    let pre = tHead;
    let stack = [];
    while (tmp) {
        stack.push(tmp.val);
        tmp = tmp.next;
    }
    while (stack.length != 0) {
        pre.next = new ListNode(stack.pop());
        pre = pre.next;
    }
    return tHead.next;
};