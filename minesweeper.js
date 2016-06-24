document.addEventListener('DOMContentLoaded', startGame)
//  this is the global variable for the game board
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
//  this is the loop needed to count how far away the mines are
  for (var j = 0; j < board.cells.length; j++) {
    board.cells[j].surroundingMines = countSurroundingMines(board.cells[j])
  }
}

//  check the number of mines around the clicked cell
function countSurroundingMines (cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col)
  var count = 0
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) {
      count++
    }
  }
  return count
}

//  this listens to the functions(#1,#2) below and dictates how to execute their behaviours
function addListeners (element) {
  element.addEventListener('click', showCell)
  element.addEventListener('contextmenu', markCell)
}

// #1 shows cell on click
function showCell (evt) {
  evt.target.classList.remove('hidden')
  showSurrounding(evt.target)
}

// #2 this flags the bombs, also checks if theyre flagged
function markCell (evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
  evt.target.classList.toggle('hidden')
  //  this is the part that checks if the cell is flagged
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].row === getRow(evt.target) && board.cells[i].col === getCol(evt.target)) {
      board.cells[i].isMarked = true
    }
  }
}
//  classy and sassy (sassy is irrelevent, just for put there for fun)
function getRow (element) {
  var classy = element.classList
  for (var i = 0; i < classy.length; i++) {
    if (classy[i].substring(0, 3) === 'row') {
      return Number(classy[i].split('-')[1])
    }
  }
}

//  classy and sassy (sassy is irrelevent, just for put there for fun)
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

// pulled everything below from lib, could refactor to just pull functions and not all of the code, since it already exists in lib
function getSurroundingCells (row, col) {
  var columns = getRange(getLowerBound(col), getUpperBound(col))
  var rows = getRange(getLowerBound(row), getUpperBound(row))
  return board.cells
    .filter(function (cell) {
      return columns.includes(cell.col) && rows.includes(cell.row)
    })
}

//  Avoid breaking the call stack with recurrent checks on same cell
function showSurrounding (element) {
  getSurroundingCells(getRow(element), getCol(element))
    .filter(function (cell) {
      return !cell.isMine
    })
    .filter(function (cell) {
      return !cell.isProcessed
    })
    .forEach(setInnerHTML)
}

//  #1, these 3 functions apply info to countSurroundingCells
function getRange (begin, end) {
  return Array.apply(begin, Array(end - begin + 1))
    .map(function (n, i) {
      return begin + i
    })
}

//  #2
function getLowerBound (n) {
  return n - 1 < 0 ? 0 : n - 1
}

//  #3
function getUpperBound (n) {
  var limit = board.MAX_CELLS - 1 || 4
  return n + 1 > limit ? limit : n + 1
}
