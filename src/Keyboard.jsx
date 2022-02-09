import { useEffect } from 'react'
import { MdBackspace, MdSend } from 'react-icons/md'

export function Keyboard({ onKeyPressed, onEnter, onBackspace }) {
  useEffect(() => {
    const handlePress = ({ code, key, ctrlKey, altKey }) => {
      switch (code) {
        case 'Enter':
          onEnter()
          return
        case 'Backspace':
          onBackspace()
          return
        default:
          if (ctrlKey || altKey || !code.startsWith('Key')) return
          onKeyPressed(key.toUpperCase())
          return
      }
    }
    window.addEventListener('keydown', handlePress)
    return () => window.removeEventListener('keydown', handlePress)
  }, [onKeyPressed, onEnter, onBackspace])

  return (
    <div className='space-y-2 text-2xl'>
      <div className='flex space-x-2'>
        <Key>Q</Key>
        <Key>W</Key>
        <Key>E</Key>
        <Key>R</Key>
        <Key>T</Key>
        <Key>Y</Key>
        <Key>U</Key>
        <Key>I</Key>
        <Key>O</Key>
        <Key>P</Key>
      </div>
      <div className='flex space-x-2 ml-2'>
        <Key>A</Key>
        <Key>S</Key>
        <Key>D</Key>
        <Key>F</Key>
        <Key>G</Key>
        <Key>H</Key>
        <Key>J</Key>
        <Key>K</Key>
        <Key>L</Key>
      </div>
      <div className='flex space-x-2 ml-6'>
        <Key>Z</Key>
        <Key>X</Key>
        <Key>C</Key>
        <Key>V</Key>
        <Key>B</Key>
        <Key>N</Key>
        <Key>M</Key>
        <Key onFunction={onBackspace}><MdBackspace /></Key>
        <Key onFunction={onEnter}><MdSend /></Key>
      </div>
    </div>
  )

  function Key({ children, onFunction }) {
    const fn = onFunction || onKeyPressed
    return (
      <button onClick={() => fn(children)} className='hover:bg-amber-200 bg-amber-300 rounded-md px-4 py-2 h-12 min-w-12'>{ children }</button>
    )
  }
}
