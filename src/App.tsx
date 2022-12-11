import { useState, MouseEvent } from 'react'

interface Dot {
  x: number
  y: number
}

function App() {
  const [dots, setDots] = useState<Dot[]>([])
  const [undoStack, setUndoStack] = useState<Dot[]>([])

  const handleClick = (e: MouseEvent) => {
    // get the coordinates of the click
    const x = e.clientX
    const y = e.clientY

    // create a new dot at the click position
    const dot = {
      x,
      y,
    }

    // add the new dot to the list of dots
    setDots([...dots, dot])
  }

  const handleUndo = () => {
    // remove the last dot from the list of dots
    const newDots = dots.slice(0, -1)

    // add the removed dot to the undo stack
    setUndoStack([...undoStack, dots[dots.length - 1]])

    // update the list of dots
    setDots(newDots)
  }

  const handleRedo = () => {
    // get the last dot from the undo stack
    const dot = undoStack[undoStack.length - 1]

    // remove the dot from the undo stack
    const newUndoStack = undoStack.slice(0, -1)

    // add the dot back to the list of dots
    setDots([...dots, dot])

    // update the undo stack
    setUndoStack(newUndoStack)
  }

  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <div onClick={handleClick} className="dots">
        {dots.map(({ x, y }, i) => (
          <div key={i} className="dot" style={{ left: x, top: y }} />
        ))}
      </div>
    </div>
  )
}

export default App
