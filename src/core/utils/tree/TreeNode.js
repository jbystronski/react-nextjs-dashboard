class TreeNode {
  constructor(key, value = key, parent = null, children = []) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = children;
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }

  //   get _children() {
  //     return this.children;
  //   }

  get _value() {
    return this.value;
  }

  set _value(v) {
    this.value = v;
  }

  get _key() {
    return this.key;
  }
}

export default TreeNode;
