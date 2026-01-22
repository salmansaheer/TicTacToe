export default function GameOver({winner, onReset}) {
    return(
        <div id="game-over">
            Game Over!
            {winner ? <h2>{winner} Won!</h2> : <p>It's a Draw!</p>}
            <button onClick={onReset}>Rematch</button>
        </div>
    )
}