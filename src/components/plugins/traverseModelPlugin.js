class TreeNode {
  constructor ({id, uuid, type, name, children}) {
    this.id = id
    this.uuid = uuid
    this.type = type
    this.name = name
    this.children = children
  }
}


function walk (mesh) {
  const nodeTree = new TreeNode({id: mesh.ID, uuid: mesh.uuid, type: mesh.type, children: [], name: mesh.name})
  const children = mesh.children || []
  nodeTree.children = children.map(child => {
    return walk(child)
  })
  return nodeTree
}

export default function traverseModelPlugin() {
  this.on('modelLoaded', () => {
    const city = this.city
    // const nodeTree = new TreeNode(city.ID, city.uuid, city.type, [])
    // city.traverse(child => {
    //   const node = new TreeNode(child.ID, child.uuid, child.type, [])
    //   nodeTree.children.push(node)
    // })
    const nodeTree = walk(city)
    this.nodeTree = nodeTree
    this.emit('traverseComplete')
  })
}

