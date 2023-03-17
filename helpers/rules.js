export function isValidMove(squares, src, dest, piece, history) {
  let isWhitePiece = piece.charAt(0) === 'w'
  if (piece.charAt(1) === 'p') {
    return isValidPawnMove(squares, src, dest, isWhitePiece, history)
  } else if (piece.charAt(1) === 'n') {
    return isValidKnightMove(squares, src, dest)
  } else if (piece.charAt(1) === 'b') {
    return (isValidBishopMove(squares, src, dest))
  } else if (piece.charAt(1) === 'r') {
    return (isValidRookMove(squares, src, dest))
  } else if(piece.charAt(1) === 'q'){
    return (isValidQueenMove(squares, src, dest))
  } else if(piece.charAt(1) === 'k'){
    return (isValidKingMove(squares, src, dest))
  }
  return [false, null]
}

function isValidPawnMove(squares, src, dest, isWhitePiece, history) {
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  if (isWhitePiece) {
    if ((dest === src - 8 && !destSquare.piece) || (dest === src - 16 && !destSquare.piece && srcSquare.coordinate.charAt(1) === '2')) { //Forward move
      return [true, null]
    }
    else if ((dest === src - 9 || dest === src - 7) && destSquare.piece && destSquare.piece.charAt(0) === 'b') { //Capture
      return [true, null]
    }
    else if (history.length > 0 && history[history.length - 1].slice(0, 2) === 'bp' && history[history.length - 1].slice(3) === '5' && !history.find(e => { e.includes('bp' + history[history.length - 1].charAt(2)) }) && srcSquare.coordinate.charAt(1) === history[history.length - 1].charAt(3) && destSquare.coordinate.charAt(0) == history[history.length - 1].charAt(2) && (dest === src - 9 || dest === src - 7)) { //En passant
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
    else if (history.length > 0 && history[history.length - 1].slice(0, 2) === 'wp' && history[history.length - 1].slice(3) === '4' && !history.find(e => { e.includes('wp' + history[history.length - 1].charAt(2)) }) && srcSquare.coordinate.charAt(1) === history[history.length - 1].charAt(3) && destSquare.coordinate.charAt(0) == history[history.length - 1].charAt(2) && (dest === src + 9 || dest === src + 7)) { //En passant
      return [true, dest - 8]
    }
  }
  return [false, null];
}

function isValidKnightMove(squares, src, dest) {
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  let sameRow = destSquare.coordinate.charAt(0) === srcSquare.coordinate.charAt(0)
  let isValid = ((src - 17 === dest && !sameRow) ||
    (src - 10 === dest && !sameRow) ||
    (src + 6 === dest && !sameRow) ||
    (src + 15 === dest && !sameRow) ||
    (src - 15 === dest && !sameRow) ||
    (src - 6 === dest && !sameRow) ||
    (src + 10 === dest && !sameRow) ||
    (src + 17 === dest && !sameRow))
  return [isValid, null]
}

function isValidBishopMove(squares, src, dest){
  let isValid = false
  let increment = -1
  if(Math.abs(dest - src) % 9 === 0) {
    increment = 9
  }else if (Math.abs(dest - src) % 7 === 0) {
    increment = 7
  }
  if(increment > 0) {
    let obstructing = false
    let i = dest < src ? dest + increment : src + increment
    let end = dest < src ? src : dest 
    for(i; i < end; i+=increment){
      if(squares[i].piece){
        obstructing = true
      }
    }
    isValid = !obstructing
  }
  return [isValid, null]
}

function isValidRookMove(squares, src, dest){
  let isValid = false
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  let increment = -1
  if(destSquare.coordinate.charAt(0) == srcSquare.coordinate.charAt(0)){
    increment = 8
  }else if(destSquare.coordinate.charAt(1) == srcSquare.coordinate.charAt(1)){
    increment = 1
  }
  if(increment > 0) {
    let obstructing = false
    let i = dest < src ? dest + increment : src + increment
    let end = dest < src ? src : dest 
    for(i; i < end; i+=increment){
      if(squares[i].piece){
        obstructing = true
      }
    }
    isValid = !obstructing
  }
  return [isValid, null]
}

function isValidQueenMove(squares, src, dest){
  const [validRook, trash1] = isValidRookMove(squares, src, dest)
  const [validBish, trash2] = isValidBishopMove(squares, src, dest)
  return [validRook || validBish, null]
}

function isValidKingMove(squares, src, dest){
  let destSquare = squares[dest]
  let srcSquare = squares[src]
  if(Math.abs(dest - src) == 9 ||  (Math.abs(dest - src) == 7 && destSquare.coordinate.charAt(1) != srcSquare.coordinate.charAt(1)) || Math.abs(dest - src) == 1 ||  Math.abs(dest - src) == 8){
    return isValidQueenMove(squares, src, dest)
  }
  return [false, null]
}