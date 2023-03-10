import Square from "./square";
import styles from './board.module.css'

const vertical = [1, 2, 3, 4, 5, 6, 7, 8]
const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function determinePiece(num,letter){
    let piece = null
    if(num == 2){
        piece = 'wp'
    }else if(num == 7){
        piece = 'bp'
    }else if(letter == 'e'){
        if(num == 1){
            piece = 'wk'
        }else if(num == 8){
            piece = 'bk'
        }
    }else if(letter == 'd'){
        if(num == 1){
            piece = 'wq'
        }else if(num == 8){
            piece = 'bq'
        }
    }else if(letter == 'a' || letter == 'h'){
        if(num == 1){
            piece = 'wr'
        }else if(num == 8){
            piece = 'br'
        }
    }else if(letter == 'b' || letter == 'g'){
        if(num == 1){
            piece = 'wb'
        }else if(num == 8){
            piece = 'bb'
        }
    }else if(letter == 'c' || letter == 'f'){
        if(num == 1){
            piece = 'wn'
        }else if(num == 8){
            piece = 'bn'
        }
    }
    return piece
}
export default function Board(props) {
    let squares = []
    for (let i = vertical.length - 1; i >= 0; i--) {
        let lightColor = i % 2 == 0 ? true :false
        for (let j = 0; j < horizontal.length; j++) {
            let piece = determinePiece(vertical[i],horizontal[j])
            squares.push(
            <Square piece={piece} coordinate={horizontal[j]+vertical[i]}lightColor={lightColor}>
            </Square>)
            lightColor = !lightColor
        }
    }
    return (
        <div className={styles.chessboard}>
            {squares}
        </div>
    )
}