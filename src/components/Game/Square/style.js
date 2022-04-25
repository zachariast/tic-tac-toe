import styled, { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
 0% { transform: scale(1) }
 50% { transform: scale(.9) }
 100% { transform: scale(1) }
`

export const SquareButton = styled.button`
  width: 150px;
  height: 150px;
  font-size: 75px;
  border-color: rgb(252, 77, 60);
  border: solid 6px;
  color: ${props => props.winning ? 'white' : 'rgb(252, 77, 60)'};
  background-color: ${props => props.winning ? 'rgb(252, 77, 60)' : 'transparent'};
  margin: 5px;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  animation-name: ${props => props.winning ? breatheAnimation : null};
  animation-duration: 1s;
  animation-iteration-count: 2;
`;
