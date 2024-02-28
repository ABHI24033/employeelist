import { useState } from 'react'

import RegistrationForm from './components/RegistrationForm';
import List from './components/List';
import { myContext } from './components/Context';
function App() {
  const [context, setcontext] = useState()

  return (
    <>
     {/* <Form/> */}
     <myContext.Provider value={{context,setcontext}}>
     <RegistrationForm/>

      <List/>
     </myContext.Provider>
      
    </>
  )
}

export default App
