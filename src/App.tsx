import { useState, MouseEvent } from 'react'

interface Dot {
  x: number
  y: number
}

function App() {
  const [dots, setDots] = useState<Dot[]>([])
  const [undoStack, setUndoStack] = useState<Dot[]>([])

  const handleClick = (e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    const dot = { x, y }
    setDots([...dots, dot])
  }

  const handleUndo = () => {
    const newDots = dots.slice(0, -1)
    setUndoStack([...undoStack, dots[dots.length - 1]])
    setDots(newDots)
  }

  const handleRedo = () => {
    const dot = undoStack[undoStack.length - 1]
    const newUndoStack = undoStack.slice(0, -1)
    setDots([...dots, dot])
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
