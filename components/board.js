import styles from './board.module.css'
import Square from "./square"
import { Text } from '@nextui-org/react'
export default function Board(props) {
    let squares = props.squares
    let board = []
    let i = 0
    squares.forEach(e => {
        board.push(
            <Square key={e.coordinate} id={e.coordinate} selected={e.selected} check={e.check} piece={e.piece} lightColor={e.lightColor} click={props.click} index={i}>
            </Square>)
        i++
    });
    return (
        //mark file and number for squares
        <div>
            <div className={styles.numbers}>
                <Text>8</Text>
                <Text>7</Text>
                <Text>6</Text>
                <Text>5</Text>
                <Text>4</Text>
                <Text>3</Text>
                <Text>2</Text>
                <Text>1</Text>
            </div>
            <div className={styles.container}>
                <div className={styles.chessboard}>
                    {board}
                </div>
                <div className={styles.files}>
                    <Text css={{height: 'fit-content'}}>a</Text>
                    <Text css={{height: 'fit-content'}}>b</Text>
                    <Text css={{height: 'fit-content'}}>c</Text>
                    <Text css={{height: 'fit-content'}}>d</Text>
                    <Text css={{height: 'fit-content'}}>e</Text>
                    <Text css={{height: 'fit-content'}}>f</Text>
                    <Text css={{height: 'fit-content'}}>g</Text>
                    <Text css={{height: 'fit-content'}}>h</Text>
                </div>
            </div>

        </div>

    )
}
