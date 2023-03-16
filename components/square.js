import styles from './square.module.css'
import Piece from './piece';

export default function Square(props) {
    //piece assets taken from chess.com, don't get me in trouble pls
    let backgroundImageUrl = props.piece ? `https://www.chess.com/chess-themes/pieces/classic/150/${props.piece}.png` : ''
    return (
        <button 
            id={props.id}
            className={props.lightColor ? `${styles.square}  ${styles.lightSquare}` : `${styles.square}  ${styles.darkSquare}`} 
            onClick = {props.click}
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'contain',
                backgroundColor: props.selected? 'yellow' : null
            }}>
        </button>
    )
}
