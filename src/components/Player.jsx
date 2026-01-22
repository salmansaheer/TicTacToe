import { useState } from "react"

export default function Player ( {initialName, symbol, player} ){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    let playerName = <span className="player-name">{name}</span>

    function handleEdit () {setIsEditing((editing) => !editing);}

    function handleChange(event){setName(event.target.value)}

    if (isEditing){
        playerName = <input type="text"  value={name} onChange={handleChange}/>
    }
    return (
        <li className={(player == symbol) && "active"}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{!isEditing ? "Edit" :"Save" }</button>
        </li>
    )
}