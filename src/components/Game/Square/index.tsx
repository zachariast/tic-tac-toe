import { SquareButton } from './style'
import { useSelector, useDispatch } from 'react-redux'
import { storeBoard, storeCurrentPlayerMark } from '../../../store/boardSettings'

type SquareProps = {
  value: string
  index: number
}

export const Square = ({ value, index }: SquareProps) => {
  const dispatch = useDispatch()
  const { winningIndexes, winner, board, currentPlayerMark } = useSelector((state : any) => state.boardSettings)

  const handleClick = (index: number): void => {
    const boardCopy = [...board]
    boardCopy.splice(index, 1, currentPlayerMark)
    dispatch<any>(storeBoard(boardCopy))
    dispatch<any>(storeCurrentPlayerMark(currentPlayerMark === "O" ? "X" : "O"))
  }

  return (
    <SquareButton winning={winningIndexes.includes(index)} disabled={!!winner?.length || !!value} onClick={() => handleClick(index)}>{value}</SquareButton>
  )
}