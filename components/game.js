import Board from "./board";
import { useState } from 'react';
import { isValidMove } from "../helpers/rules";

const vertical = [1, 2, 3, 4, 5, 6, 7, 8]
const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function determinePiece(num, letter) {
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
            piece = 'wb'
        } else if (num == 8) {
            piece = 'bb'
        }
    } else if (letter == 'c' || letter == 'f') {
        if (num == 1) {
            piece = 'wn'
        } else if (num == 8) {
            piece = 'bn'
        }
    }
    return piece
}

function initGame() {
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
                    'lightColor': lightColor
                })
            lightColor = !lightColor
        }
    }
    return squares
}

export default function Game() {
    const [gameState, setGameState] = useState({
        squares: initGame(),
        selectedSquare: null,
        whiteTurn: true,
        history: []
    });

    function click(e) {
        let id = e.target.id
        let x = horizontal.indexOf(id.charAt(0))
        let y = vertical.indexOf(Number(id.charAt(1)))
        let i = x+(7-y)*8
        //Logic below highlights selected square and shows possible moves. If there was already a selected square, clear the previous selected square.
        let lastSelectedSquare = gameState.selectedSquare
        let currentSquareInd = null
        if(gameState.squares[i].piece && (gameState.squares[i].piece.charAt(0) == 'w' && gameState.whiteTurn || gameState.squares[i].piece.charAt(0) == 'b' && !gameState.whiteTurn)){
            let isWhitePiece = gameState.squares[i].piece.charAt(0) == 'w' 
            if(isWhitePiece == gameState.whiteTurn){ //Condition catches player selecting another one of their pieces after already selecting one
                gameState.squares[i].selected = !gameState.squares[i].selected
                currentSquareInd = i
            }
        }else{
            if(lastSelectedSquare != null){
                const [valid, enPassant] = isValidMove(gameState.squares, lastSelectedSquare, i, gameState.squares[lastSelectedSquare].piece, gameState.history)
                if(valid){
                    gameState.squares[i].piece = gameState.squares[lastSelectedSquare].piece
                    gameState.squares[lastSelectedSquare].piece = null
                    if(enPassant){
                        gameState.squares[enPassant].piece = null
                    }
                    gameState.whiteTurn = !gameState.whiteTurn
                    gameState.history.push(gameState.squares[i].piece + gameState.squares[i].coordinate)
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
            history: gameState.history
        })
    }

    return (
        <Board squares={gameState.squares} click={e => click(e)}/>
    )
}