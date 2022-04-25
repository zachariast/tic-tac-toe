import { SquareButton } from './style'

type SquareProps = {
  value: string
  index: number
}

export const Square = ({value, index }: SquareProps) => {

  return (
    <SquareButton>{value}</SquareButton>
  )
}