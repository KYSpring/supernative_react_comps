import { useState } from 'react'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import SingleTarget from './components/single-target'
import Uploader from './components/drag-upload-file'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
            <Uploader></Uploader>
            {/* <DndProvider backend={HTML5Backend}>
                <SingleTarget></SingleTarget>
            </DndProvider> */}
        </div>
    </>
  )
}

export default App
