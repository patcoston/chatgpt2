import React from 'react'
import { Stage, Layer, Circle } from 'react-konva'

function App() {
  const [dots, setDots] = React.useState([])
  const [undoStack, setUndoStack] = React.useState([])

  const handleClick = e => {
    // get the coordinates of the click
    const x = e.evt.layerX
    const y = e.evt.layerY

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
      <Stage onClick={handleClick} width={500} height={500}>
        <Layer>
          {dots.map((dot, i) => (
            <Circle key={i} x={dot.x} y={dot.y} radius={5} fill="black" />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default App
