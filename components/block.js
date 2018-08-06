const block = {

  isBomb: function() {
    const isABomb =  numBelow100() <= 20 ? true : false
    if (isABomb) {
      this.html.innerHTML = this.generateBomb()
    }
    return isABomb;
  },

  generateBomb: function() {
    return "<div class='red-circle'></div>"
  },

  uncover: function() {
    this.html.classList.add('uncovered');
    this.isBomb()
  },

  click: function() {
    this.html.classList.add('uncovered');
    if (!this.isBomb()) {
      mineSweeper.uncoverNeighbours(this);
      // remove event listener not working, can click twice
      this.html.removeEventListener('click', this.click)
    }
  }
}
