import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if (gameTurns.length >0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectTile(rowIndex, cellIndex){

    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivedActivePlayer(prevGameTurns);
      const updatedTurns = [
        { square: {row:rowIndex, cell:cellIndex}, player: currentPlayer },
        ...prevGameTurns
      ];
      
      return updatedTurns;
    }); 
  }
  return (
    <main>
      <div id = 'game-container'>
        <ol id = "players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" player = {activePlayer}></Player>
          <Player initialName="Player 2" symbol="O" player = {activePlayer}></Player>
        </ol>
        <GameBoard onSelectTile={handleSelectTile} turns = {gameTurns}></GameBoard>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
