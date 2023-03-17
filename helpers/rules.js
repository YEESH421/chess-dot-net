const isSameRow = (src, dest) => {
    return !!(rowDictionary[src] && rowDictionary[src][dest]);
  }
  
  const isSameColumn = (src, dest) => {
    return !!(columnDictionary[src] && columnDictionary[src][dest]);
  }
  
  const isSameDiagonal = (src, dest) => {
    return !!((diagonalDictionaryTLBR[src] && diagonalDictionaryTLBR[src][dest]) ||
      (diagonalDictionaryTRBL[src] && diagonalDictionaryTRBL[src][dest]))
  }
  
  const isPathClean = (srcToDestPath, squares) => srcToDestPath.reduce((acc, curr) => !squares[curr] && acc, true)

export function isValidMove(squares, src, dest, piece, history) {
    let isWhitePiece = piece.charAt(0) == 'w'
    if(piece.charAt(1) == 'p'){
        return isValidPawnMove(squares, src, dest, isWhitePiece, history)
    }
    return [false, null]
}

function isValidPawnMove(squares, src, dest, isWhitePiece, history){
    let destSquare = squares[dest] 
    let srcSquare = squares[src] 
    if (isWhitePiece) {
        if ((dest === src - 8 && !destSquare.piece) || (dest === src - 16 && !destSquare.piece && srcSquare.coordinate.charAt(1) === '2')) { //Forward move
          return [true, null]
        }
        else if ((dest === src - 9 || dest === src - 7) && destSquare.piece && destSquare.piece.charAt(0) === 'b') { //Capture
          return [true, null]
        }
        else if(history.length > 0 && history[history.length - 1].slice(0, 2) === 'bp' && history[history.length - 1].slice(3) === '5' && !history.find(e => {e.includes('bp'+history[history.length - 1].charAt(2))}) && srcSquare.coordinate.charAt(1) === history[history.length - 1].charAt(3) && destSquare.coordinate.charAt(0) ==  history[history.length - 1].charAt(2) && (dest === src - 9 || dest === src - 7)){ //En passant
            return [true, dest + 8]
        }
      }
      else {
        if ((dest === src + 8 && !destSquare.piece) || (dest === src + 16 && !destSquare.piece && srcSquare.coordinate.charAt(1) === '7' )) {
            return [true, null]
          }
          else if ((dest === src + 9 || dest === src + 7) && destSquare.piece && destSquare.piece.charAt(0) === 'w') {
            return [true, null]
          }
          else if(history.length > 0 && history[history.length - 1].slice(0, 2) === 'wp' && history[history.length - 1].slice(3) === '4' && !history.find(e => {e.includes('wp'+history[history.length - 1].charAt(2))}) && srcSquare.coordinate.charAt(1) === history[history.length - 1].charAt(3) && destSquare.coordinate.charAt(0) ==  history[history.length - 1].charAt(2) && (dest === src + 9 || dest === src + 7)){ //En passant
            return [true, dest - 8]
        }
      }
      return [false, null];
}