

import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charcterAllowed, setCharcterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback( () => {
    let pass = ""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      string = string + "0123456789"
    }
    if(charcterAllowed){
      string = string + "!@#$%&*"
    }

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * string.length +1)

      pass += string.charAt(char)
    }
    
    setPassword(pass)

  },
    [length, numberAllowed, charcterAllowed, setPassword] )

  const copyPasswordToClickBoard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

    useEffect(() => {
      passwordGenerator()
    },[length, numberAllowed, charcterAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md px-4 my-8 py-3 text-orange-700 rounded-lg bg-gray-700'>
    <h1 className='text-white text-4xl text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClickBoard}
        className='outline-none bg-blue-700 text-white px-4 py-1 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 text-xs'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)} }
           />
           <label> Length: {length} </label>

        </div>
        <div className='flex items-center text-xl'>
          <input 
          type="checkbox"
          defaultChecked = {numberAllowed}
          id = "numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
           />
           <label htmlFor="numberInput"> Numbers </label>
        </div>
        <div className='flex items-center text-xl'>
        <input 
          type="checkbox"
          defaultChecked = {charcterAllowed}
          id = "charcterInput"
          onChange={() => {
            setCharcterAllowed((prev) => !prev);
          }}
           />
           <label htmlFor="charcterInput"> Character </label>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App
