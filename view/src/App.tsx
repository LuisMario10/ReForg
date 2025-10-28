import { useState } from "react"

export default function App() {
  const [name, setName] = useState("ReForg");

  return (
    <div>
      <p>
        Hello { name }
      </p>
      <button onClick={() => setName("Reforg App") }>
        Mudar Texto
      </button>
    </div>
  )
}