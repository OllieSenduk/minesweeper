'use strict';

Number.randomNumberFunction = function randomNumber(num) {
  return function() {
    return Math.round(Math.random() * num)
  }
}

const numBelow100 = Number.randomNumberFunction(100)
// Block proto

const block = {

  canBeBomb: function() {
    this.isABomb = numBelow100() <= 10 ? true : false;
  },

  generateBomb: function() {
    return "<div class='red-circle'></div>"
  },

  uncover: function() {
    this.html.classList.add('uncovered');
    this.uncovered = true;
    if (this.isABomb) {
      this.html.innerHTML = this.generateBomb()
    }
  },

  click: function() {
    this.html.removeEventListener('click', this.click)
    this.uncover();
    if (!this.isABomb) {
      mineSweeper.uncoverNeighbours(this);
      // remove event listener not working, can click twice
    } else {
      // So its a bomb
      mineSweeper.endOfGame();
    }
  }
}

// Row proto

const row = {

  appendBlock: function(blockHTML) {
    this.html.insertAdjacentElement('beforeend', blockHTML);
  },

  addBlock: function(block) {
    // console.log(this.rowIndex)
    this.blocks.push(block);
    // console.log(this.blocks);
    block.rowPos = this.rowIndex;
    block.blockPos = this.blocks.indexOf(block);
    this.appendBlock(block.html)
  },

  neighboursOf: function(blockPos) {
    const closeNeighbours = [];
    const positions = mineSweeper.createPositions(blockPos);
    positions.forEach((row, i) => {
      closeNeighbours.push(this.blocks[blockPos + i])
    })
    return closeNeighbours;
  },
}

// MineSweeper!

const mineSweeper = {
  rows: [],
  blocks: [],

  endOfGame: function() {
    let count = 0;
    this.rows.forEach(row => {
      row.blocks.forEach(block => {
        if (block.uncovered) count++;
      })
    })
    alert(`Game over! You uncovered ${count} blocks without exploding`)
  },

  startGame: function(event) {
    const form = event.currentTarget;
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
    row.blocks = [];

    for(let i = 1; i <= width; i++) {
      let block = this.generateBlock(row);
      row.addBlock(block);
    }
    this.appendRow(gridContainer, row.html);
  },


  generateBlock: function(rowObj) {
    const blockHTML = document.createElement('div');
    blockHTML.classList.add('block');

    const blockObj = Object.create(block);
    blockObj.html = blockHTML;
    this.blocks.push(blockObj)
    blockObj.canBeBomb();
    blockHTML.addEventListener('click', blockObj.click.bind(blockObj));
    return blockObj;
  },

  setFormListener: function() {
    const form = document.getElementById('gridForm');
    form.addEventListener('submit', this.startGame.bind(this));
  },

  uncoverNeighbours: function(block) {
    let neighbours = this.getNeighbours(block);
    let randomNumber = Math.round(Math.random() * neighbours.length);
    for (let i = 0; i <= randomNumber; i++) {
      let block = neighbours[i];
      if (block !== undefined) block.uncover();
    }
  },

  createPositions: function(blockPos) {
    if (blockPos === 1) {
      return [0, 1];
    } else if (blockPos === this.rows.length) {
      return [-1, 0];
    } else {
      return [-1, 0, 1];
    }
  },

  getNeighbours: function(block) {
    // if block.rowPos == 0 or this.rows.length - 1 === rowPos
    // something else.
    const posModifiers = this.createPositions(block.rowPos);
    let neighbours = [];
    posModifiers.forEach(posModifier => {
      let currentRow = this.rows[block.rowPos + posModifier]
      // Issue that all blocks have index from 1 to 100, not 1 to 10. Everything still in a big block array.
      neighbours.push(currentRow.neighboursOf(block.blockPos))
    })
    return [].concat.apply([], neighbours);
  },

  recursiveUncover: function(neighbours, proximity) {
    // if proximity < 1 return
    this.recursiveUncover(remainingNeighbours, proximity)
    // Keep clicking neighbours until proximity is small. Or no more neighbours
  }
}


mineSweeper.setFormListener();
mineSweeper.generateGrid(10,10);
