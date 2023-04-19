import Board from "./board";
import Sidebar from "./sidebar";
import styles from "./game.module.css"
import { useState, useEffect } from 'react';
import { isCheck, isLegalMove, legalMovesForPiece, isMate, findOwnKing } from "../helpers/rules"
import { Modal, Text, Button, Image, Row, Container, Grid, Card } from "@nextui-org/react";

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
    if (piece.charAt(0) === 'w') {
        capturesObj.blackCaptures.push(piece)
    } else if (piece.charAt(0) === 'b') {
        capturesObj.whiteCaptures.push(piece)
    }
    return capturesObj
}

export default function Game() {
    const initialGameState = {
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

    }
    const [gameState, setGameState] = useState(initialGameState);
    const [openPromotionMenu, setOpenPromotionMenu] = useState(false)
    const [promotedPiece, setPromotedPiece] = useState(null)
    const [promoteDestIndx, setPromoteDestIndx] = useState(null)
    const [promoteSrcIndx, setPromoteSrcIndx] = useState(null)
    const [winner, setWinner] = useState(null)

    //This use effect handles pawn promotions and determines own checks and opponent checks
    useEffect(() => {
        if (promotedPiece) {
            let i = promoteDestIndx
            let l = promoteSrcIndx
            let ownKingInd = findOwnKing(gameState.squares, gameState.whiteTurn)
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
            setPromoteDestIndx(null)
            setPromoteSrcIndx(null)
        }
    }, [promotedPiece])

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
                        setOpenPromotionMenu(true)
                        return
                    }
                    let ownKingInd = findOwnKing(gameState.squares, gameState.whiteTurn)
                    gameState.whiteTurn = !gameState.whiteTurn
                    gameState.moves.push(gameState.squares[i].piece + gameState.squares[i].coordinate)
                    gameState.squares[ownKingInd].check = false
                    gameState.squares[lastSelectedSquare].check = false
                    //Extract elements from current gamestate and push it to the history
                    const { squares, whiteTurn, moves, captures } = _.cloneDeep(gameState)
                    gameState.history.push({ squares, whiteTurn, moves, captures })
                    let [oppCheck, oppKingInd] = isCheck(gameState.squares, gameState.whiteTurn, gameState.moves)
                    if (oppCheck) {
                        let currPlayerColor = gameState.whiteTurn ? 'b' : 'w'
                        gameState.squares[oppKingInd].check = true
                        if (isMate(gameState.squares, gameState.whiteTurn, gameState.moves)) {
                            setWinner(currPlayerColor)
                        }
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
        setOpenPromotionMenu(false)
    }

    function getPromotionAsset(piece) {
        let color = gameState.whiteTurn ? 'w' : 'b'
        return `https://www.chess.com/chess-themes/pieces/classic/150/${color + piece}.png`
    }

    function resetHandler() {
        setGameState(initialGameState)
        setWinner(null)
    }
    function revertToMove(e) {
        let indx = e.target.value
        let { squares, whiteTurn, moves, captures } = gameState.history[indx]
        setGameState({
            squares: [...squares],
            selectedSquare: null,
            whiteTurn: whiteTurn,
            moves: moves,
            captures: captures,
            history: gameState.history
        })
    }
    return (
        <div>
            <Modal
                open={openPromotionMenu}
                preventClose>
                <Modal.Body css={{ backgroundColor: 'rgba(127, 127, 127, 0.8)'}}>
                    <Row>                
                        <Image css={{ '&:hover' :{backgroundColor: 'rgba(255, 255, 255, 0.3)'} }} height={120} src={getPromotionAsset('q')} onClick={() => promote('q')} />
                        <Image css={{ '&:hover' :{backgroundColor: 'rgba(255, 255, 255, 0.3)'} }} height={120} src={getPromotionAsset('r')} onClick={() => promote('r')} />
                        <Image css={{ '&:hover' :{backgroundColor: 'rgba(255, 255, 255, 0.3)'} }} height={120} src={getPromotionAsset('b')} onClick={() => promote('b')} />
                        <Image css={{ '&:hover' :{backgroundColor: 'rgba(255, 255, 255, 0.3)'} }} height={120} src={getPromotionAsset('n')} onClick={() => promote('n')} />
                    </Row>
                </Modal.Body>
            </Modal>
            <Modal
                open={winner !== null}
                preventClose>
                <Modal.Header>
                    <Text b id="modal-title" size="$3xl">
                        {winner === 'w' ? 'White Wins!' : winner === 'b' ? 'Black Wins!' : 'Stalemate'}
                    </Text>
                </Modal.Header>
                <Modal.Footer>
                    <Button auto onPress={resetHandler}>
                        Play Again
                    </Button>
                </Modal.Footer>
            </Modal>
            <Grid.Container justify="space-evenly">
                <Grid>
                    <Board squares={gameState.squares} click={e => click(e)}/>
                </Grid>
                <Grid>
                    <Sidebar gameState={gameState} winner={winner} resetHandler={resetHandler} revertToMove={(event) => {revertToMove(event)}}/>
                </Grid>
            </Grid.Container>
                
        </div>
    )
}