// 判断链表是否有环
// 一快一慢两个指针遍历链表，如果两个指针能够相逢，那么链表就有圈
// 遍历结束后，还没有相逢就返回false

// 慢指针： p1 = p1.next
// 快指针定义： p2 = p1.next.next
// 两个指针相逢：指向同一个节点。


const hasCycle = function (head) {
    let p1 = head;
    let p2 = head;

    while (p1 && p2 && p2.next) {
        p1 = p1.next;
        p2 = p2.next.next;

        if (p1 === p2) {
            return true
        }

        return false
    }
}