// import { useState } from 'react'
// import './App.css'

// const App = () => {
//   const [steps, setSteps] = useState(0);

//   return (
//     <div className="container">
//       <p>Today you've taken {steps} steps!</p>
//       <button onClick={() => setSteps(steps + 1)}>Click Me</button>
//     </div>
//   )
// }

// export default App;

import { useState } from 'react'
import './App.css'

const Limita = ({ lungime }) => {
  if (lungime > 20) {
    return (
      <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
      !!!!! Prea lung! Mai sterge ceva.
      </div>
    )
  }
  
  return (
    <div style={{ color: 'gray', marginTop: '10px' }}>
      Totul e ok. Mai ai loc.
    </div>
  )
}

const App = () => {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2>Postare Noua</h2>
      
      <textarea 
        rows="4" 
        cols="30"
        placeholder="Scrie ceva aici..."
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />

      <p>Caractere: {text.length} / 20</p>
      
      <Limita lungime={text.length} />
    </div>
  )
}

export default App;