import styled from 'styled-components';

export const GameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.gridSize}, 1fr)
`;