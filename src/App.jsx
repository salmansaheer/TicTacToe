import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

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
  let gameState = [...initialGameState.map(row => [...row])];
  let winner = null;

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, cell} = square;
      gameState[row][cell] = player;
  }
  if (gameTurns.length >=1){
    for (const combination of WINNING_COMBINATIONS){
      const firstTileSymbol = gameState[combination[0].row][combination[0].column];
      const secondTileSymbol = gameState[combination[1].row][combination[1].column];
      const thirdTileSymbol = gameState[combination[2].row][combination[2].column];

      if (firstTileSymbol && firstTileSymbol === secondTileSymbol && firstTileSymbol === thirdTileSymbol){
        winner = firstTileSymbol;
      }
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id = 'game-container'>
        <ol id = "players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" player = {activePlayer}></Player>
          <Player initialName="Player 2" symbol="O" player = {activePlayer}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset ={handleRematch}></GameOver>}
        <GameBoard onSelectTile={handleSelectTile} gameState={gameState}></GameBoard>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
