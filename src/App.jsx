import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectTile(){
    setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }
  return (
    <main>
      <div id = 'game-container'>
        <ol id = "players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" player = {activePlayer}></Player>
          <Player initialName="Player 2" symbol="O" player = {activePlayer}></Player>
        </ol>
        <GameBoard onSelectTile={handleSelectTile} player = {activePlayer}></GameBoard>
      </div>
    </main>
  )
}

export default App
