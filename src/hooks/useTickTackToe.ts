import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { storeBoard, storeWinner, storeStatus, storeWinningIndexes, storeCurrentPlayerMark, storeTieGame } from '../store/boardSettings'

type ExportValues = {
  status: string
  currentPlayerMark: string
  winner: string | null
  tieGame: boolean
  handleRestartGame: () => void
  handleStartGame: () => void
}

type BoardItemProps = {
  content: string
  index: number
}
export default (): ExportValues => {
  const { players, gridSize, board, winner, status, winningIndexes, currentPlayerMark, winningPositions, tieGame } = useSelector((state : any) => state.boardSettings)
  const dispatch = useDispatch();

  useEffect(() => {
    let winningPositionsTries = 0
    let winner: string | null = null

    while (winningPositionsTries < winningPositions.length && !winner) {
      const checkWinningArrays = winningPositions[winningPositionsTries]
      const formatWinningArrays = checkWinningArrays.map((index: number) => {
        return {
          content: board[index],
          index
        }
      })
      const firstArrayValue = formatWinningArrays[0].content
      const isFinished = formatWinningArrays.every((value: BoardItemProps) => value.content === firstArrayValue)
      const boardIsFull = board.every((val:string) => val.length)
      winner = !isFinished ? null : firstArrayValue

      if(winner) {
        // Array with indexes to indicate winning squares
        dispatch<any>(storeWinningIndexes(formatWinningArrays.map((item: any) => item.index)))
      }

      if(boardIsFull && !winner) {
        dispatch<any>(storeTieGame(true))
      }

      winningPositionsTries++
    }

    if (winner) {
      // Initial value is X so X is assigned to players[0]
      dispatch<any>(storeWinner(winner === "X" ? players[0] : players[1]))
      dispatch<any>(storeStatus('finished'))
      return
    }

  }, [board, players, status])

  const handleStartGame = () => {
    dispatch<any>(storeCurrentPlayerMark('X'))
    dispatch<any>(storeStatus('started'))
  }

  const handleRestartGame = () => {
    dispatch<any>(storeBoard(Array(gridSize * gridSize).fill("")))
    dispatch<any>(storeTieGame(false))
    dispatch<any>(storeWinner(""))
    dispatch<any>(storeWinningIndexes([]))
    dispatch<any>(storeCurrentPlayerMark('X'))
    dispatch<any>(storeStatus('started'))
  }

  return {
    status,
    currentPlayerMark,
    winner,
    tieGame,
    handleRestartGame,
    handleStartGame,
  }
}