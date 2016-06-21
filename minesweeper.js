document.addEventListener('DOMContentLoaded', startGame)
var board = {
  cells: []
}

//  this starts the game by looking through the cells in the html file
function startGame () {
  var boardCells = (document.getElementsByClassName('board')[0].children)
  for (var i = 0; i < boardCells.length; i++) {
    addListeners(boardCells[i])
  }
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
