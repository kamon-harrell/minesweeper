document.addEventListener('DOMContentLoaded', startGame)
var board = {
  cells: []
}

//  this starts the game by looking through the cells in the html file
function startGame () {
  var boardCells = (document.getElementsByClassName('board')[0].children)
  for (var i = 0; i < boardCells.length; i++) {
    addListeners(boardCells[i])
    addCellToBoard(boardCells[i])
  }

  for (var j = 0; j < board.cells.length; j++) {
    board.cells[j].surroundingMines = countSurroundingMines(board.cells[j])
  }
}

// check the number of mines around the clicked cell
function countSurroundingMines (cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col)
  var count = 0
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) {
      count++
    }
  }
}

function getSurroundingCells (row, col) {
  var columns = getRange(getLowerBound(col), getUpperBound(col))
  var rows = getRange(getLowerBound(row), getUpperBound(row))
  return board.cells
    .filter(function (cell) {
      return columns.includes(cell.col) && rows.includes(cell.row)
    })
}

//  this listens to the functions below and dictates how to execute their behaviours
function addListeners (element) {
  element.addEventListener('click', showCell)
  element.addEventListener('contextmenu', markCell)
}

//  shows cell
function showCell (evt) {
  evt.target.classList.remove('hidden')
}

//  this flags the bombs
function markCell (evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
  evt.target.classList.toggle('hidden')
}

//  classy and sassy
function getRow (element) {
  var classy = element.classList
  for (var i = 0; i < classy.length; i++) {
    if (classy[i].substring(0, 3) === 'row') {
      return Number(classy[i].split('-')[1])
    }
  }
}

//  classy and sassy
function getCol (element) {
  var classy = element.classList
  for (var i = 0; i < classy.length; i++) {
    if (classy[i].substring(0, 3) === 'col') {
      return Number(classy[i].split('-')[1])
    }
  }
}

//  adds info to board
function addCellToBoard (element) {
  var newCell = {
    row: getRow(element),
    col: getCol(element),
    isMine: element.classList.contains('mine')
  }
  board.cells.push(newCell)
}
