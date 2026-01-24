import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIALGAMESTATE = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    "X": "Player 1",
    "O": "Player 2"
};

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if (gameTurns.length >0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveGameState(gameTurns){
  let gameState = [...INITIALGAMESTATE.map(row => [...row])];

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, cell} = square;
      gameState[row][cell] = player;
  }
  return gameState;
}
function derivedWinner(gameState){
  let winner = null;
  for (const combination of WINNING_COMBINATIONS){
    const firstTileSymbol = gameState[combination[0].row][combination[0].column];
    const secondTileSymbol = gameState[combination[1].row][combination[1].column];
    const thirdTileSymbol = gameState[combination[2].row][combination[2].column];

    if (firstTileSymbol && firstTileSymbol === secondTileSymbol && firstTileSymbol === thirdTileSymbol){
      winner = firstTileSymbol;
    }
  }
  return winner
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameState = deriveGameState(gameTurns);
  const winner = derivedWinner(gameState);

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
  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }
  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id = 'game-container'>
        <ol id = "players" className="highlight-player">
          <Player 
            initialName= {PLAYERS.X}
            symbol="X" 
            player = {activePlayer} 
            onNameChange={handlePlayerNameChange}
          />
          <Player 
            initialName= {PLAYERS.O}
            symbol="O" 
            player = {activePlayer} 
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset ={handleRematch} player={players}></GameOver>}
        <GameBoard onSelectTile={handleSelectTile} gameState={gameState}></GameBoard>
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
