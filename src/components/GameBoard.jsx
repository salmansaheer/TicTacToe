const initialGameState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBoard({onSelectTile, turns , activePlayer}) {
    let gameState = initialGameState;
    
    for (const turn of turns){
        const {square, player} = turn;
        const {row, cell} = square;
        gameState[row][cell] = player;
    }
    // const [gameState, setGameState] = useState(initialGameState);

    // function handleTileClick(rowIndex, cellIndex) {
    //     setGameState((prevGameState) => {
    //         const newGameState = [...prevGameState.map(row => [...row])];
    //         newGameState[rowIndex][cellIndex] = player;
    //         return newGameState;
    //     })
    //     onSelectTile();
    // }
    return (
        <ol id="game-board">
            {gameState.map((row, rowIndex) =>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((cell, cellIndex)=>(
                            <li key={cellIndex}>
                                <button 
                                onClick={() => onSelectTile(rowIndex, cellIndex)}
                                disabled={cell !== null}
                                >
                                    {cell}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}