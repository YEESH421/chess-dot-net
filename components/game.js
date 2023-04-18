import Board from "./board";
import { useState, useEffect } from 'react';
import { isCheck, isLegalMove, legalMovesForPiece, isMate, findOwnKing } from "../helpers/rules"
import Popup from 'reactjs-popup';

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

function capture(piece, capturesObj) { //updates captured pieces for black and white
    if (piece.charAt(0) == 'w') {
        capturesObj.blackCaptures.push(piece)
    } else if (piece.charAt(0) == 'b') {
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
        captures: {
            whiteCaptures: [],
            blackCaptures: []
        },
        history: [{
            squares: initGame(),
            whiteTurn: true,
            moves: [],
            captures: {
                whiteCaptures: [],
                blackCaptures: []
            },
        }]

    });
    const [open, setOpen] = useState(false)
    const [promotedPiece, setPromotedPiece] = useState(null)
    const [promoteDestIndx, setPromoteDestIndx] = useState(null)
    const [promoteSrcIndx, setPromoteSrcIndx] = useState(null)
    const [check, setCheck] = useState(false)
    //This use effect handles pawn promotions and determines own checks and opponent checks
    useEffect(() => {
        if (promotedPiece) {
            let i = promoteDestIndx
            let l = promoteSrcIndx
            let  ownKingInd = findOwnKing(gameState.squares, gameState.whiteTurn)
            gameState.squares[i].piece = promotedPiece
            gameState.whiteTurn = !gameState.whiteTurn
            gameState.moves.push(gameState.squares[i].piece + gameState.squares[i].coordinate)
            gameState.squares[ownKingInd].check = false
            //Extract elements from current gamestate and push it to the history
            const { squares, whiteTurn, moves, captures } = gameState
            gameState.history.push({ squares, whiteTurn, moves, captures })
            let [oppCheck, oppKingInd] = isCheck(gameState.squares, gameState.whiteTurn, gameState.moves)
            if (oppCheck) {
                gameState.squares[oppKingInd].check = true
            }
            if (l != null && l != i) {
                gameState.squares[l].selected = false
            }
            setGameState({
                squares: [...gameState.squares],
                selectedSquare: null,
                whiteTurn: gameState.whiteTurn,
                moves: gameState.moves,
                captures: gameState.captures,
                history: gameState.history
            })
            setPromotedPiece(null)
        }
    }, [promotedPiece])

    useEffect(() => {
        if (check[0]) {
            if (check[1] === 'b') {
                return
            } else if (check[1] === 'w') {
                return
            }
        }
    }, [check])
    function click(e) {
        let id = e.target.id
        let x = horizontal.indexOf(id.charAt(0))
        let y = vertical.indexOf(Number(id.charAt(1)))
        let i = x + (7 - y) * 8
        //Logic below highlights selected square and shows possible moves. If there was already a selected square, clear the previous selected square.
        let lastSelectedSquare = gameState.selectedSquare
        let currentSquareInd = null
        if (gameState.squares[i].piece && (gameState.squares[i].piece.charAt(0) === 'w' && gameState.whiteTurn || gameState.squares[i].piece.charAt(0) === 'b' && !gameState.whiteTurn)) {
            let isWhitePiece = gameState.squares[i].piece.charAt(0) === 'w'
            if (isWhitePiece == gameState.whiteTurn) { //Condition catches player selecting another one of their pieces after already selecting one
                gameState.squares[i].selected = !gameState.squares[i].selected
                currentSquareInd = i
            }
            console.log(legalMovesForPiece(gameState.squares, i, gameState.history))
        } else { //If player selects any square other than ones with their own pieces, move selected piece there, taking enemy piece on that square if possible
            if (lastSelectedSquare != null) { //First check if there was a selected piece to move
                const [valid, enPassant] = isLegalMove(gameState.squares, lastSelectedSquare, i, gameState.moves)
                if (valid) { //See if the move is valid (not including checks)
                    if (gameState.squares[i].piece) { //Capture piece if possible
                        gameState.captures = capture(gameState.squares[i].piece, gameState.captures)
                    }
                    else if (enPassant) {
                        gameState.captures = capture(gameState.squares[enPassant].piece, gameState.captures)
                        gameState.squares[enPassant].piece = null
                    }
                    gameState.squares[i].piece = gameState.squares[lastSelectedSquare].piece //Move piece to new square
                    gameState.squares[lastSelectedSquare].piece = null
                    //Go to next turn, update move history, and highlight checks on the enemy
                    if ((gameState.whiteTurn && gameState.squares[i].piece === 'wp' && gameState.squares[i].coordinate.charAt(1) === '8') || (!gameState.whiteTurn && gameState.squares[i].piece === 'bp' && gameState.squares[i].coordinate.charAt(1) === '1')) {
                        setPromoteDestIndx(i)
                        setPromoteSrcIndx(lastSelectedSquare)
                        setOpen(true)
                        return
                    }
                    let ownKingInd = findOwnKing(gameState.squares, gameState.whiteTurn)
                    gameState.whiteTurn = !gameState.whiteTurn
                    gameState.moves.push(gameState.squares[i].piece + gameState.squares[i].coordinate)
                    gameState.squares[ownKingInd].check = false
                    gameState.squares[lastSelectedSquare].check = false
                    setCheck([false, null])
                    //Extract elements from current gamestate and push it to the history
                    const { squares, whiteTurn, moves, captures } = gameState
                    gameState.history.push({ squares, whiteTurn, moves, captures })
                    let [oppCheck, oppKingInd] = isCheck(gameState.squares, gameState.whiteTurn, gameState.moves)
                    if (oppCheck) {
                        let color = gameState.whiteTurn ? 'w' : 'b'
                        setCheck([true, color])
                        gameState.squares[oppKingInd].check = true
                        let mate = isMate(gameState.squares, gameState.whiteTurn, gameState.moves)
                        console.log(mate)
                    
                    }

                }
            }
        }
        if (lastSelectedSquare != null && lastSelectedSquare != i) {
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

    function promote(piece) {
        let color = gameState.whiteTurn ? 'w' : 'b'
        setPromotedPiece(color + piece)
        setOpen(false)
    }

    function getPromotionAsset(piece) {
        let color = gameState.whiteTurn ? 'w' : 'b'
        return `https://www.chess.com/chess-themes/pieces/classic/150/${color + piece}.png`
    }

    return (
        <div>
            <Popup open={open} closeOnDocumentClick={false}>
                <div id="pawn-promotion-modal">
                    <div className="modal-body">
                        <img onClick={() => promote('q')} src={getPromotionAsset('q')} />
                        <img onClick={() => promote('r')} src={getPromotionAsset('r')} />
                        <img onClick={() => promote('b')} src={getPromotionAsset('b')} />
                        <img onClick={() => promote('n')} src={getPromotionAsset('n')} />
                    </div>
                </div>
            </Popup>
            <Board squares={gameState.squares} click={e => click(e)} />
            {gameState.captures.whiteCaptures.length}
            {gameState.captures.blackCaptures.length}
        </div>


    )
}