const _ = require('lodash');

export function findOwnKing(squares, isWhitePiece){
  const king = isWhitePiece ? 'wk' : 'bk'
  return squares.findIndex(e => e.piece == king)
}

export function isLegalMove(squares, src, dest, priorMoves) {
  if(dest < 0 || dest > 63){
    return[false, null]
  }
  const piece = squares[src].piece
  const isWhitePiece = piece.charAt(0) === 'w'
  const [valid, passantedSquare] = movePossibleSansCheck(squares, src, dest, priorMoves)
  if(valid){
    let squaresClone = _.cloneDeep(squares) //make a cloned gamestate and check if move reveals check on player making the move
    squaresClone[src].piece = null
    squaresClone[dest].piece = piece
    if(isCheck(squaresClone, isWhitePiece, priorMoves)[0]){
      return [false, null]
    }
  }
  return [valid, passantedSquare]
}

export function isCheck(squares, isWhitePiece, priorMoves) {
  const oppositeColor = isWhitePiece ? 'b' : 'w'
  const kingInd = findOwnKing(squares, isWhitePiece)
  const threatensKing = (i) => movePossibleSansCheck(squares, i, kingInd, priorMoves)
  for(let i = 0; i < squares.length; i++){
    if(squares[i].piece && squares[i].piece.charAt(0) == oppositeColor && threatensKing(i)[0]){
      return [true, kingInd]
    }
  }
  return [false, kingInd]
}

//determine what moves are legal for piece at index src
export function legalMovesForPiece(squares, src, priorMoves){
  let legal = []
  const piece = squares[src].piece
  const isWhitePiece = piece.charAt(0) === 'w'
  //narrow down list of squares the piece could reasonably go to before seeing if each move is legal
  let moves = []
  if (piece.charAt(1) === 'p') {
    moves = [src - 8, src - 16, src - 9, src - 7, src + 8, src + 16, src + 9, src + 7]
  } else if (piece.charAt(1) === 'n') {
    moves = [src - 6, src - 10, src - 15, src - 17, src + 6, src + 10, src + 15, src + 17]
  } else if (piece.charAt(1) === 'b') {
    moves = bishopMoveFinder(moves, src)
  } else if (piece.charAt(1) === 'r') {
    moves = rookMoveFinder(moves, src, squares)
  } else if (piece.charAt(1) === 'q') { //queen combines rook and bishop moves
    moves = bishopMoveFinder(moves, src)
    moves = [...new Set(moves.concat(rookMoveFinder(moves, src, squares)))]
  } else if (piece.charAt(1) === 'k') {
    moves = [src - 1, src + 1, src - 8, src + 8, src - 9, src - 7, src + 9, src + 7]
  }  
  for(let move of moves){
    if(isLegalMove(squares, src, move, isWhitePiece, priorMoves)[0]) {
      legal.push(move)
    }
  }
  return legal
}

export function isMate(squares, isWhitePiece, priorMoves){
  const color = isWhitePiece ? 'w' : 'b'
  for(let i = 0; i < squares.length; i++){
    if(squares[i].piece && squares[i].piece.charAt(0) == color){
      if(legalMovesForPiece(squares, i, priorMoves).length > 0){
        return false
      }
    }
  }
  return true
}

function movePossibleSansCheck(squares, src, dest, priorMoves){
  const piece = squares[src].piece
  const isWhitePiece = piece.charAt(0) === 'w'
  let result = false
  let passantedSquare = null
  if (piece.charAt(1) === 'p') {
    [result, passantedSquare] = pawnMove(squares, src, dest, isWhitePiece, priorMoves)
  } else if (piece.charAt(1) === 'n') {
    result = knightMove(squares, src, dest)[0]
  } else if (piece.charAt(1) === 'b') {
    result = bishopMove(squares, src, dest)[0]
  } else if (piece.charAt(1) === 'r') {
    result = rookMove(squares, src, dest)[0]
  } else if (piece.charAt(1) === 'q') {
    result = queenMove(squares, src, dest)[0]
  } else if (piece.charAt(1) === 'k') {
    result = kingMove(squares, src, dest)[0]
  }
  return [result, passantedSquare]
}


function pawnMove(squares, src, dest, isWhitePiece, priorMoves) {
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  if (isWhitePiece) {
    if ((dest === src - 8 && !destSquare.piece) || (dest === src - 16 && !destSquare.piece && srcSquare.coordinate.charAt(1) === '2')) { //Forward move
      return [true, null]
    }
    else if ((dest === src - 9 || dest === src - 7) && destSquare.piece && destSquare.piece.charAt(0) === 'b') { //Capture
      return [true, null]
    }
    else if (priorMoves.length > 0 && priorMoves[priorMoves.length - 1].slice(0, 2) === 'bp' && priorMoves[priorMoves.length - 1].slice(3) === '5' && !priorMoves.find(e => { e.includes('bp' + priorMoves[priorMoves.length - 1].charAt(2)) }) && srcSquare.coordinate.charAt(1) === priorMoves[priorMoves.length - 1].charAt(3) && destSquare.coordinate.charAt(0) == priorMoves[priorMoves.length - 1].charAt(2) && (dest === src - 9 || dest === src - 7)) { //En passant
      return [true, dest + 8]
    }
  }
  else {
    if ((dest === src + 8 && !destSquare.piece) || (dest === src + 16 && !destSquare.piece && srcSquare.coordinate.charAt(1) === '7')) {
      return [true, null]
    }
    else if ((dest === src + 9 || dest === src + 7) && destSquare.piece && destSquare.piece.charAt(0) === 'w') {
      return [true, null]
    }
    else if (priorMoves.length > 0 && priorMoves[priorMoves.length - 1].slice(0, 2) === 'wp' && priorMoves[priorMoves.length - 1].slice(3) === '4' && !priorMoves.find(e => { e.includes('wp' + priorMoves[priorMoves.length - 1].charAt(2)) }) && srcSquare.coordinate.charAt(1) === priorMoves[priorMoves.length - 1].charAt(3) && destSquare.coordinate.charAt(0) == priorMoves[priorMoves.length - 1].charAt(2) && (dest === src + 9 || dest === src + 7)) { //En passant
      return [true, dest - 8]
    }
  }
  return [false, null];
}

function knightMove(squares, src, dest) {
  const destSquare = squares[dest]
  const srcSquare = squares[src]
  const sameRow = destSquare.coordinate.charAt(0) === srcSquare.coordinate.charAt(0)
  //knight moves at max can cover 2 horizontal squares, so check if dest is within 2 horizontal squares
  const crossedEdge = Math.abs((srcSquare.coordinate.charCodeAt(0) - 97) - (destSquare.coordinate.charCodeAt(0) - 97)) > 2
  let isValid = ((src - 17 === dest ) ||
    (src - 10 === dest ) ||
    (src + 6 === dest ) ||
    (src + 15 === dest ) ||
    (src - 15 === dest ) ||
    (src - 6 === dest ) ||
    (src + 10 === dest ) ||
    (src + 17 === dest )) && !sameRow && !crossedEdge
  //Can't take own piece
  if(destSquare.piece && destSquare.piece.charAt(0) === srcSquare.piece.charAt(0)) {
    isValid = false
  }
  return [isValid, null]
}

function bishopMove(squares, src, dest) {
  let isValid = false
  let increment = -1
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  if(destSquare.lightColor === srcSquare.lightColor){
    if (Math.abs(dest - src) % 9 === 0 ) {
      increment = 9
    } else if (Math.abs(dest - src) % 7 === 0) {
      increment = 7
    }
  }
  if (increment > 0) {
    let obstructing = false
    let i = dest < src ? dest + increment : src + increment
    let end = dest < src ? src : dest
    for (i; i < end; i += increment) {
      if (squares[i].piece) {
        obstructing = true
      }
    }
    isValid = !obstructing
  }
  //Can't take own piece
  if(destSquare.piece && destSquare.piece.charAt(0) === srcSquare.piece.charAt(0)) {
    isValid = false
  }
  return [isValid, null]
}

function rookMove(squares, src, dest) {
  let isValid = false
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  let increment = -1
  if (destSquare.coordinate.charAt(0) === srcSquare.coordinate.charAt(0)) {
    increment = 8
  } else if (destSquare.coordinate.charAt(1) === srcSquare.coordinate.charAt(1)) {
    increment = 1
  }
  if (increment > 0) {
    let obstructing = false
    let i = dest < src ? dest + increment : src + increment
    let end = dest < src ? src : dest
    for (i; i < end; i += increment) {
      if (squares[i].piece) {
        obstructing = true
      }
    }
    isValid = !obstructing
  }
  //Can't take own piece
  if(destSquare.piece && destSquare.piece.charAt(0) === srcSquare.piece.charAt(0)) {
    isValid = false
  }
  return [isValid, null]
}

function queenMove(squares, src, dest) {
  const [validRook, trash1] = rookMove(squares, src, dest)
  const [validBish, trash2] = bishopMove(squares, src, dest)
  return [validRook || validBish, null]
}

function kingMove(squares, src, dest) {
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  if (Math.abs(dest - src) == 9 || (Math.abs(dest - src) == 7 && destSquare.coordinate.charAt(1) != srcSquare.coordinate.charAt(1)) || Math.abs(dest - src) == 1 || Math.abs(dest - src) == 8) {
    return queenMove(squares, src, dest)
  }
  return [false, null]
}

function bishopMoveFinder(moves, src){
  //find diagonal squares - some squares may not actually be diagonal, but that's fine we are just trying to narrow down destination squares for piece
  let d1 = 9 
  let i = src + d1
  while(i < 64){
    moves.push(i)
    i+=d1
  }
  i = src - d1
  while(i >= 0){
    moves.push(i)
    i-=d1
  }
  let d2 = 7
  i = src + d2
  while(i < 64){
    moves.push(i)
    i+=d2
  }
  i = src - d2
  while(i >= 0){
    moves.push(i)
    i-=d2
  }
  return moves
}
function rookMoveFinder(moves, src, squares){
  //get row and column
  let rowInd = src - (src % 8)
  let rowEnd = rowInd + 8
  while(rowInd < rowEnd){
    if(rowInd !== src){
      moves.push(rowInd)
    }
    rowInd += 1
  }
  let colInd = squares[src].coordinate.charCodeAt(0) - 97 //Use file letter to determine column rook is in
  let colEnd = colInd + 57
  while(colInd < colEnd){
    if(colInd !== src){
      moves.push(colInd)
    }
    colInd+=8
  }
  return moves
}