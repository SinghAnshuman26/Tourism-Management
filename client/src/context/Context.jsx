import { createContect } from 'react'
import runChat from '../gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const OnSent = async(prompt)=>{
        await runChat(prompt)
    }
    OnSent("what is react")
    const contextValue ={


    }

  return (
    <Context.Provider value ={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
