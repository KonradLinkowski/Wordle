import clsx from 'clsx'

export function Board({ letters, column, row }) {
  return (
    <div className='flex flex-col space-y-4'>
      {
        letters.map((letters, y) => (<Row key={y} letters={letters} highlight={y === row} current={column} />))
      }
    </div>
  )
}

function Row({ letters, highlight, current }) {
  return (
    <div className={clsx(
      'flex space-x-2',
      highlight && 'outline outline-offset-2 outline-2'
    )}>
      {
        letters.map((data, i) => (<Box key={i} highlight={highlight && (i === current)} { ...data } />))
      }
    </div>
  )
}

const types = {
  valid: 'bg-amber-500',
  semivalid: 'bg-green-500',
  invalid: 'bg-gray-500',
  unknown: ''
}

function Box({ letter, type, highlight }) {
  return (
    <span className={clsx(
      'select-none border-2 border-black flex justify-center items-center font-mono',
      'w-12 h-12 text-3xl',
      'sm:w-16 sm:h-16 sm:text-5xl',
      highlight && 'bg-red-100',
      types[type]
    )}>{letter}</span>
  )
}

