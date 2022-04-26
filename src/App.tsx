import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storePlayerNames, storeGridSize } from './store/boardSettings'
import useTickTackToe from "./hooks/useTickTackToe"
import Game from './components/Game'

function App() {
  const [playerNames, setPlayerNames] = useState(['Player 1','Player 2'])
  const [error, setError] = useState({
    gridSize: false
  })
  const { players, gridSize } = useSelector((state : any) => state.boardSettings)
  const dispatch = useDispatch();
  const game = useTickTackToe();

  const startGame = () => {
    if(gridSize && gridSize >= 3){
      game.handleStartGame()
      dispatch<any>(storePlayerNames(playerNames))
    } else {
      setError({ gridSize: true })
    }
  }
  const restartGame = () => {
    game.handleRestartGame()
  }

  const handleNameBlur = (index:number, val:string) => {
    const newItems = [...playerNames]
    newItems[index] = val
    setPlayerNames(newItems)
  }

  const handleGridBlur = (val:string) => {
    dispatch<any>(storeGridSize(+val))
  }
  return (
    <div className="App">
      <div className='game-container'>
        {game.status === 'inactive' ? (
          <>
            <div className='game-container__names'>
              <div>
                <input type="text" placeholder='Player 1 Name' onChange={(e) => handleNameBlur(0, e.target.value)}/>
              </div>
              <div>
                <input type="text" placeholder='Player 2 Name' onChange={(e) => handleNameBlur(1, e.target.value)}/>
              </div>
              <div className='grid-input'>
                {error.gridSize ? <label>Grid size must be bigger than 3</label> : null}
                <input type="number" placeholder='Grid size ex. 3' min="3" onChange={(e) => handleGridBlur(e.target.value)}/>
              </div>
            </div>
            <div className='button-container'>
              <button onClick={startGame}>Start</button>
            </div>
          </>
        ) : (
        <>
          <div className='game-container__label_names'>
            {players.map((name:string, index:number) => {
              return (
                <React.Fragment key={index}>
                  <div className='game-container__label_names__name'>{name}</div>
                  {index === 0 ? <div className='vs'>VS</div> : null}
                </React.Fragment>
              )
            })}
          </div>
          <Game />
          <div className='game-container__infos'>
            <div>
              <div>{game.winner ? 'Winner' : 'Next player'}</div>
              <div>{game.winner ? game.winner : game.currentPlayerMark}</div>
            </div>
          </div>
        </>
        )}
        <div className='button-container'>
          {game.status !== 'inactive' ? <button onClick={restartGame}>Restart</button> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
