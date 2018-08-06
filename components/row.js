const row = {
  blocks: [],

  appendBlock: function(blockHTML) {
    this.html.insertAdjacentElement('beforeend', blockHTML);
  },

  addBlock: function(block) {
    this.blocks.push(block);
    block.rowPos = this.rowIndex;
    block.blockPos = this.blocks.indexOf(block);
    this.appendBlock(block.html)
  },

  neighboursOf: function(blockPos) {
    closeNeighbours = [];
    [-1, 0, 1].forEach((row, i) => {
      closeNeighbours.push(this.blocks[blockPos + i])
    })
    // const topNeigbours, bottomNeighbours, sideNeighbours;
    return closeNeighbours;
  },
}
