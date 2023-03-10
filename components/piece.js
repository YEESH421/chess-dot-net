import Image from 'next/image';

export default function Piece(props) {
    let assetPath = "/assets/" + props.piece + ".png"
    return (
        <Image
        src={assetPath}// Route of the image file
        fill='true'
        object-fit='contain'
    />)
}