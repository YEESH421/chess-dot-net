import Board from "./board";
import { useState } from 'react';
import { isCheck, isValidMove } from "../helpers/rules";
const _ = require('lodash');

const vertical = [1, 2, 3, 4, 5, 6, 7, 8]
const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function determinePiece(num, letter) { //returns piece to correct starting position
    let piece = null
    if (num == 2) {
        piece = 'wp'
    } else if (num == 7) {
        piece = 'bp'
    } else if (letter == 'e') {
        if (num == 1) {
            piece = 'wk'
        } else if (num == 8) {
            piece = 'bk'
        }
    } else if (letter == 'd') {
        if (num == 1) {
            piece = 'wq'
        } else if (num == 8) {
            piece = 'bq'
        }
    } else if (letter == 'a' || letter == 'h') {
        if (num == 1) {
            piece = 'wr'
        } else if (num == 8) {
            piece = 'br'
        }
    } else if (letter == 'b' || letter == 'g') {
        if (num == 1) {
            piece = 'wn'
        } else if (num == 8) {
            piece = 'bn'
        }
    } else if (letter == 'c' || letter == 'f') {
        if (num == 1) {
            piece = 'wb'
        } else if (num == 8) {
            piece = 'bb'
        }
    }
    return piece
}

function initGame() { //returns an array representation of the board with all the pieces in starting position
    let squares = []
    for (let i = vertical.length - 1; i >= 0; i--) {
        let lightColor = i % 2 == 0 ? true : false
        for (let j = 0; j < horizontal.length; j++) {
            let piece = determinePiece(vertical[i], horizontal[j])
            squares.push(
                {
                    coordinate: horizontal[j] + vertical[i], 
                    selected: false,
                    'piece': piece,
                    'lightColor': lightColor,
                    check: false
                })
            lightColor = !lightColor
        }
    }
    return squares
}

function capture(piece, capturesObj){ //updates captured pieces for black and white
    if(piece.charAt(0) =='w'){
        capturesObj.blackCaptures.push(piece)
    }else if(piece.charAt(0) =='b'){
        capturesObj.whiteCaptures.push(piece)
    }
    return capturesObj
}

export default function Game() {
    const [gameState, setGameState] = useState({
        squares: initGame(),
        selectedSquare: null,
        whiteTurn: true,
        moves: [],
        captures:{
            whiteCaptures: [],
            blackCaptures: []
        },
        history:[{
            squares: initGame(),
            whiteTurn: true,
            moves: [],
            captures:{
                whiteCaptures: [],
                blackCaptures: []
            },
        }]

    });

    function click(e) {
        let id = e.target.id
        let x = horizontal.indexOf(id.charAt(0))
        let y = vertical.indexOf(Number(id.charAt(1)))
        let i = x+(7-y)*8
        //Logic below highlights selected square and shows possible moves. If there was already a selected square, clear the previous selected square.
        let lastSelectedSquare = gameState.selectedSquare
        let currentSquareInd = null
        if(gameState.squares[i].piece && (gameState.squares[i].piece.charAt(0) === 'w' && gameState.whiteTurn || gameState.squares[i].piece.charAt(0) === 'b' && !gameState.whiteTurn)){
            let isWhitePiece = gameState.squares[i].piece.charAt(0) == 'w' 
            if(isWhitePiece == gameState.whiteTurn){ //Condition catches player selecting another one of their pieces after already selecting one
                gameState.squares[i].selected = !gameState.squares[i].selected
                currentSquareInd = i
            }
        }else{ //If player selects any square other than ones with their own pieces, move selected piece there, taking enemy piece on that square if possible
            if(lastSelectedSquare != null){ //First check if there was a selected piece to move
                const [valid, enPassant] = isValidMove(gameState.squares, lastSelectedSquare, i, gameState.moves) 
                if(valid){ //See if the move is valid (not including checks)
                    const oldSquares =  _.cloneDeep(gameState.squares) //keep a copy of the old board in case move results in a check on your own king
                    if(gameState.squares[i].piece){ //Capture piece if possible
                        gameState.captures = capture(gameState.squares[i].piece, gameState.captures)
                    }
                    else if(enPassant){
                        gameState.captures = capture(gameState.squares[enPassant].piece, gameState.captures)
                        gameState.squares[enPassant].piece = null
                    }
                    gameState.squares[i].piece = gameState.squares[lastSelectedSquare].piece //Move piece to new square
                    gameState.squares[lastSelectedSquare].piece = null
                    let [ownCheck, ownKingInd] = isCheck(gameState.squares, gameState.whiteTurn, gameState.moves)
                    if (ownCheck) { //In case move results in a check on your king, cancel that move
                        gameState.squares = oldSquares
                    } else{ //Otherwise, go to next turn, update move history, and highlight checks on the enemy
                        gameState.whiteTurn = !gameState.whiteTurn 
                        gameState.moves.push(gameState.squares[i].piece + gameState.squares[i].coordinate)    
                        gameState.squares[ownKingInd].check = false
                        gameState.squares[lastSelectedSquare].check = false
                        const {squares, whiteTurn, moves, captures} = gameState
                        gameState.history.push({squares, whiteTurn, moves, captures})      
                        let [oppCheck, oppKingInd] = isCheck(gameState.squares, gameState.whiteTurn, gameState.moves)     
                        if(oppCheck) {
                            gameState.squares[oppKingInd].check = true
                        }    
                    }
                }
            }
        }
        if(lastSelectedSquare != null && lastSelectedSquare != i){
            gameState.squares[lastSelectedSquare].selected = false
        }
        setGameState({
            squares: [...gameState.squares],
            selectedSquare: currentSquareInd,
            whiteTurn: gameState.whiteTurn,
            moves: gameState.moves,
            captures: gameState.captures,
            history: gameState.history
        })
    }

    return (
        <div>
            <Board squares={gameState.squares} click={e => click(e)}/>
            {gameState.captures.whiteCaptures.length}
            {gameState.captures.blackCaptures.length}
        </div>
        
        
    )
}