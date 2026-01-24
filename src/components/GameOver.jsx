export default function GameOver({winner, onReset, player}) {
    return(
        <div id="game-over">
            Game Over!
            {winner ? <h2>{player[winner]} Won!</h2> : <p>It's a Draw!</p>}
            <button onClick={onReset}>Rematch</button>
        </div>
    )
}