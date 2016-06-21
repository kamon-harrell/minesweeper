document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  var boardCells = (document.getElementsByClassName('board')[0].children)
    for (var i = 0; i < boardCells.length; i++) {
      addListeners(boardCells[i])
    }
}

function addListeners (element) {
  element.addEventListener('click',showCell)
}


function showCell (evt) {
  evt.target.classList.remove('hidden')
}