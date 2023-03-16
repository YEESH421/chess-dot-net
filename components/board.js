import styles from './board.module.css'
import Square from "./square";

export default function Board(props) {
    let squares = props.squares
    let board = []
    squares.forEach(e => {
        board.push(
            <Square key={e.coordinate} id={e.coordinate} selected={e.selected} piece={e.piece} lightColor={e.lightColor} click={props.click}>
            </Square>)
    });
    return (
        <div className={styles.chessboard}>
            {board}
        </div>
    )
}
