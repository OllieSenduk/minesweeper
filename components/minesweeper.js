
const mineSweeper = {
  rows: [],

  startGame: function(event) {
    const form = event.currentTarget
    // width is the amount of blocks in width
    const width = Number.parseInt(form.querySelector('#gridWidth').value);
    // height is the total height of the grid
    const height = Number.parseInt(form.querySelector('#gridHeight').value);
    this.generateGrid(width, height);
  },


  generateGrid: function(width, height) {

    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = "";

    if ( gridContainer === undefined ) return;

    for(let i = 1; i <= height; i++) {
      this.setRow(gridContainer, width)
    }
  },

  appendRow: function(gridContainer, row) {
    gridContainer.insertAdjacentElement('beforeend', row)
  },

  generateRow: function() {
    const rowHTML = document.createElement('div');
    rowHTML.classList.add('block-row')

    const rowObj = Object.create(row)
    rowObj.html = rowHTML

    this.rows.push(rowObj);
    return rowObj;
  },

  setRow: function(gridContainer, width) {

    const row = this.generateRow();
    row.rowIndex = this.rows.indexOf(row);

    for(let i = 1; i <= width; i++) {
      let block = this.generateBlock(row)
      row.addBlock(block)
    }
    this.appendRow(gridContainer, row.html);
  },


  generateBlock: function(rowObj) {
    const blockHTML = document.createElement('div');
    blockHTML.classList.add('block');

    const blockObj = Object.create(block)
    blockObj.html = blockHTML

    blockHTML.addEventListener('click', blockObj.click.bind(blockObj))
    return blockObj;
  },

  setFormListener: function() {
    const form = document.getElementById('gridForm')
    form.addEventListener('submit', this.startGame.bind(this))
  },

  uncoverNeighbours: function(block) {
    let neighbours = this.getNeighbours(block)
    let randomNumber = Math.round(Math.random() * neighbours.length)
    for (i = 0; i <= randomNumber; i++) {
      neighbours[i].uncover();
    }
  },

  getNeighbours: function() {
    // if block.rowPos == 0 or this.rows.length - 1 === rowPos
    // something else.
    const posModifiers = [-1, 0, 1];
    let neighbours = [];
    debugger;
    posModifiers.forEach(posModifier => {
      neighbours.push(this.rows[block.rowPos + posModifier].neighboursOf(block.blockPos))
    })
    return [].concat.apply([], neighbours);
  },

  recursiveUncover: function(neighbours, proximity) {
    // if proximity < 1 return
    this.recursiveUncover(remainingNeighbours, proximity)
    // Keep clicking neighbours until proximity is small. Or no more neighbours
  }
}

