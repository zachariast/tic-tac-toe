import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'boardSettings',
  initialState: {
    gridSize: 0,
    players: ['Player 1 name', 'Player 2 name'],
    board: Array(3 * 3).fill(""),
    winner: null,
    status: 'inactive',
    winningIndexes: [],
    currentPlayerMark: 'X',
    winningPositions: []
  },
  reducers: {
    setPlayerNamesToStore: (state, { payload, type }) => {
      state.players = payload
    },
    setGridSizeToStore: (state, { payload, type }) => {
      state.gridSize = payload
    },
    setBoardToStore: (state, { payload, type }) => {
      state.board = payload
    },
    setWinnerToStore: (state, { payload, type }) => {
      state.winner = payload
    },
    setStatusToStore: (state, { payload, type }) => {
      state.status = payload
    },
    setCurrentPlayerMarkToStore: (state, { payload, type }) => {
      state.currentPlayerMark = payload
    },
    setWinningIndexesStore: (state, { payload, type }) => {
      state.winningIndexes = payload
    },
    setWinningPositionsToStore: (state, { payload, type }) => {
      state.winningPositions = payload
    }
  },
});
export default slice.reducer

// Actions
const {
  setPlayerNamesToStore,
  setGridSizeToStore,
  setBoardToStore,
  setWinnerToStore,
  setStatusToStore,
  setWinningIndexesStore,
  setCurrentPlayerMarkToStore,
  setWinningPositionsToStore
} = slice.actions

export const storePlayerNames = (names) => async dispatch => {
  try {
    dispatch(setPlayerNamesToStore(names));
  } catch (e) {
    return console.error(e);
  }
}

export const storeBoard = (board) => async dispatch => {
  try {
    dispatch(setBoardToStore(board));
  } catch (e) {
    return console.error(e);
  }
}

export const storeWinner = (winner) => async dispatch => {
  try {
    dispatch(setWinnerToStore(winner));
  } catch (e) {
    return console.error(e);
  }
}

export const storeGridSize = (grid) => async dispatch => {
  try {
    dispatch(setGridSizeToStore(grid));
    dispatch(setBoardToStore(Array(grid * grid).fill("")));
    
    const calculateWinningPositions = () => {
      const winningRows = []
      const winningCols = []
      const winningDiag = []

      const winningBoard = []
      for (let i = 0; i <= (grid * grid) -1; i++) {
        winningBoard.push(i);
      }
  
      // Calculate the winning rows
      winningBoard.map((_, index) => {
        for (let i = grid; i > 0; i--) {
          winningRows.push(winningBoard.splice(0, Math.ceil(winningBoard.length / i)))
        }
      })
  
      for (let i = 0; i < grid; i++) {
        // Calculate the winning cols
        let cols = Array(grid).fill('')
        cols.map((_, index) => {
          cols[index] = i
          if(index > 0) cols[index] = cols[index - 1] + grid
        })
        winningCols.push(cols)
  
        // Calculate diagonals to right
        let diagonalCalculationRight = Array(grid).fill('')
        diagonalCalculationRight.map((_, index) => {
          if(index === 0) diagonalCalculationRight[index] = 0
          else diagonalCalculationRight[index] = diagonalCalculationRight[index - 1] + (grid + 1)
        })
  
        // Calculate diagonals to left
        let diagonalCalculationLeft = Array(grid).fill('')
        diagonalCalculationLeft.map((_, index) => {
          if(index === 0) diagonalCalculationLeft[index] = grid - 1
          else diagonalCalculationLeft[index] = diagonalCalculationLeft[index - 1] + (grid - 1)
        })
  
        winningDiag.push(diagonalCalculationRight)
        winningDiag.push(diagonalCalculationLeft)
      }

      return winningRows.concat(winningCols, winningDiag)
    }

    dispatch(setWinningPositionsToStore(calculateWinningPositions()));
  } catch (e) {
    return console.error(e);
  }
}

export const storeStatus = (status) => async dispatch => {
  try {
    dispatch(setStatusToStore(status));
  } catch (e) {
    return console.error(e);
  }
}

export const storeWinningIndexes = (indexes) => async dispatch => {
  try {
    dispatch(setWinningIndexesStore(indexes));
  } catch (e) {
    return console.error(e);
  }
}

export const storeCurrentPlayerMark = (mark) => async dispatch => {
  try {
    dispatch(setCurrentPlayerMarkToStore(mark));
  } catch (e) {
    return console.error(e);
  }
}