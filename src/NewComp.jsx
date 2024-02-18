import { useState } from 'react'

function NewComp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="NewComp">
            hello world!
        </div>
    </>
  )
}

export default NewComp
