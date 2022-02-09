import clsx from 'clsx'
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

  const BasicKey = withClassAndAction(Key, onKeyPressed, 'hover:bg-amber-200 bg-amber-300')
  const EnterKey = withClassAndAction(Key, onEnter, 'hover:bg-green-200 bg-green-300')
  const BackspaceKey = withClassAndAction(Key, onBackspace, 'hover:bg-blue-200 bg-blue-300')

  return (
    <div className='space-y-1 sm:space-y-2'>
      <div className='flex space-x-1 sm:space-x-2'>
        <BasicKey>Q</BasicKey>
        <BasicKey>W</BasicKey>
        <BasicKey>E</BasicKey>
        <BasicKey>R</BasicKey>
        <BasicKey>T</BasicKey>
        <BasicKey>Y</BasicKey>
        <BasicKey>U</BasicKey>
        <BasicKey>I</BasicKey>
        <BasicKey>O</BasicKey>
        <BasicKey>P</BasicKey>
      </div>
      <div className='flex space-x-1 sm:space-x-2 ml-2'>
        <BasicKey>A</BasicKey>
        <BasicKey>S</BasicKey>
        <BasicKey>D</BasicKey>
        <BasicKey>F</BasicKey>
        <BasicKey>G</BasicKey>
        <BasicKey>H</BasicKey>
        <BasicKey>J</BasicKey>
        <BasicKey>K</BasicKey>
        <BasicKey>L</BasicKey>
      </div>
      <div className='flex space-x-1 sm:space-x-2 ml-6'>
        <BasicKey>Z</BasicKey>
        <BasicKey>X</BasicKey>
        <BasicKey>C</BasicKey>
        <BasicKey>V</BasicKey>
        <BasicKey>B</BasicKey>
        <BasicKey>N</BasicKey>
        <BasicKey>M</BasicKey>
        <BackspaceKey>
          <MdBackspace />
        </BackspaceKey>
        <EnterKey>
          <MdSend />
        </EnterKey>
      </div>
    </div>
  )
}

function withClassAndAction(Component, action, className) {
  return props => (<Component action={action} className={className} { ...props } />)
}

function Key({ children, action, className }) {
  return (
    <button onClick={() => action(children)} className={clsx(
      className,
      'select-none rounded-md flex justify-center items-center',
      'h-7 w-7 text-base',
      'sm:h-12 sm:w-12 sm:text-2xl'
    )}>{ children }</button>
  )
}
