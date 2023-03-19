import styles from './square.module.css'
import Piece from './piece';

export default function Square(props) {
    //piece assets taken from chess.com, don't get me in trouble pls
    let backgroundImageUrl = props.piece ? `https://www.chess.com/chess-themes/pieces/classic/150/${props.piece}.png` : ''
    let backgroundColor = null
    if(props.selected){
        backgroundColor = 'yellow'
    } else if(props.check) {
        backgroundColor = 'red'
    }
    return (
        <button 
            id={props.id}
            className={props.lightColor ? `${styles.square}  ${styles.lightSquare}` : `${styles.square}  ${styles.darkSquare}`} 
            onClick = {props.click}
            name = {props.index}
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'contain',
                backgroundColor: backgroundColor
            }}>
        </button>
    )
}
