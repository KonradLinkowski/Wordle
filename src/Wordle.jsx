import { useReducer } from 'react';
import { Board } from './Board';
import { Keyboard } from './Keyboard';

const maxRows = 6
const maxColumns = 5
const createLetter = () => ({ type: 'unknown', letter: '' })

export function Wordle() {
  const [state, dispatch] = useReducer(reducer, {
    column: 0,
    row: 0,
    letters: Array(maxRows).fill().map(() => Array(maxColumns).fill().map(createLetter))
  })

  return (
    <div className='flex flex-col items-center space-y-6'>
      <Board {...state} />
      <Keyboard
        onKeyPressed={x => dispatch({ type: 'KEY', payload: x })}
        onEnter={() => dispatch({ type: 'ENTER' })}
        onBackspace={() => dispatch({ type: 'BACKSPACE' })}
      />
    </div>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'KEY':
      if (state.column === maxColumns) return state
      return {
        ...state,
        column: state.column + 1,
        letters: state.letters.map(
          (r, y) => y !== state.row ? r : r.map(
            (l, x) => x !== state.column ? l : { ...l, letter: action.payload }
          )
        )
      }
    case 'BACKSPACE':
      if (state.column === 0) return state
      return {
        ...state,
        column: state.column - 1,
        letters: state.letters.map(
          (r, y) => y !== state.row ? r : r.map(
            (l, x) => x !== state.column - 1 ? l : { ...l, letter: '' }
          )
        )
      }
    case 'ENTER':
      if (state.row === maxRows) return state
      if (state.column !== maxColumns) return state
      return {
        ...state,
        row: state.row + 1,
        column: 0
      }
    default:
      throw new Error('Unknown action type')
  }
}
