import { Wordle } from './Wordle';

export function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 absolute'>
        <h1 className='text-center text-7xl mb-10 font-mono'>Wordle</h1>
        <Wordle />
      </div>
    </>
  )
}
