export default function Log ({turns}){
    return (
        <ol id="log">
            {turns.map((square,player)=>(
                <li key={`${square.square.row + '-' + square.square.cell}`}>
                    <span>Player {square.player} selected {square.square.row + 1}, {square.square.cell + 1}</span>
                </li>
            ))}
        </ol>

    )
}