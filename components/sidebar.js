import { Card, Text, Row, Button, Grid, Image, Table } from "@nextui-org/react";
export default function Sidebar(props) {
    let whitesCapturedPieces = []
    let blacksCapturedPieces = []
    let moveTable = []
    for (let i = 0, j = 0; i < props.gameState.moves.length; i += 2) {
        moveTable.push(
            <Table.Row key={i}>
                <Table.Cell><Text size="$sm">{i / 2 + 1}</Text></Table.Cell>
                <Table.Cell><Text size="$sm">{props.gameState.moves[i]}</Text></Table.Cell>
                <Table.Cell><Text size="$sm">{props.gameState.moves[i + 1]}</Text></Table.Cell>
            </Table.Row>
        )
        j += 2
    }
    for (let capture of props.gameState.captures.whiteCaptures) {
        whitesCapturedPieces.push(
            <Grid>
                <Image
                    height={25}
                    width={25}
                    src={`https://www.chess.com/chess-themes/pieces/classic/150/${capture}.png`}
                    alt="Default Image"
                    objectFit="cover"
                    css={{ backgroundColor: "white" }}
                />
            </Grid>
        )
    }
    for (let capture of props.gameState.captures.blackCaptures) {
        blacksCapturedPieces.push(
            <Grid>
                <Image
                    height={25}
                    width={25}
                    src={`https://www.chess.com/chess-themes/pieces/classic/150/${capture}.png`}
                    alt="Default Image"
                    objectFit="cover"
                    css={{ backgroundColor: "white" }}
                />
            </Grid>
        )
    }
    return (
        <Card css={{ minWidth: "40vw" }}>
            <Card.Header css={{ height: "7vh" }}>
                <Text b>White</Text>
                <Grid.Container gap={1}>
                    {whitesCapturedPieces}
                </Grid.Container>
            </Card.Header>
            <Card.Divider />
            <Card.Header css={{ height: "7vh" }}>
                <Text b >Black</Text>
                <Grid.Container gap={1}>
                    {blacksCapturedPieces}
                </Grid.Container>
            </Card.Header>
            <Card.Divider />
            <Card.Body >
                <Table>
                    <Table.Header >
                        <Table.Column>Turn No.</Table.Column>
                        <Table.Column>White Move</Table.Column>
                        <Table.Column>Black Move</Table.Column>
                    </Table.Header>
                    <Table.Body onLoadMore={() => console.log("Load More")}>
                        {moveTable}
                    </Table.Body>
                    <Table.Pagination
                        shadow
                        align="center"
                        rowsPerPage={10}
                    />
                </Table>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row>
                    {/* <Button size="sm" onClick={props.revertToMove} value={props.gameState.history.length - 2} light>Rewind Move</Button>
                    <Button size="sm" light>Next Move</Button> */}
                    <Button size="sm" onClick={props.resetHandler}>Restart Game</Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}