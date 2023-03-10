import styles from './square.module.css'
import Piece from './piece';

export default function Square(props) {
    let backgroundImageUrl = props.piece ? `https://www.chess.com/chess-themes/pieces/classic/150/${props.piece}.png` : ''
    return (
        <button 
            className={props.lightColor ? styles.lightSquare : styles.darkSquare} 
            onClick={props.onClick} 
            style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'contain'
            }}>
        </button>
    )
}
