export default function GameBoard({onSelectTile, gameState}) {
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