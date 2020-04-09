
export class TNode {
    constructor({ value, parent, row, root }) {
        this.value = value
        this.row = row
        this.parent = parent
        this.root = root
        this.children = []
    }
    pushChildTNode(value) {
        this.children.push(new TNode({
            value,
            row: this.row + 1,
            parent: this,
            root: this.root
        }))
        console.log("当前树", this.root);
    }
}
export class Tree extends TNode {
    constructor(root) {
        super({
            value:root,
            parent:null,
            row:0,
            root:null
        })
        this.treeList = [[]]
    }
    pushChildTNode(value) {
        this.children.push(new TNode({
            value,
            row: this.row + 1,
            parent: this,
            root: this
        }))
    }
    search(tNode, treeList) {

        // 在当前层row插入节点tNode
        if(!treeList[tNode.row]){
            treeList.push([]) 
        }
        treeList[tNode.row].push(tNode)

        console.log(tNode.value);

        // 如果存在子节点，则继续查找
        if (tNode.children.length > 0) {
            tNode.children.forEach(tNode => {
                this.search(tNode, treeList)
            })
        }
    }
}



