// import { useState } from 'react';
// import "./App.css";

// function DFA() {
//   const [numLanguages, setNumLanguages] = useState(2);
//   const [numStates, setNumStates] = useState(4);
//   const [languages, setLanguages] = useState(['a', 'b']);
//   const [states, setStates] = useState(['A', 'B', 'C', 'D']);
//   const [initialState, setInitialState] = useState('A');
//   const [numFinalStates, setNumFinalStates] = useState(2);
//   const [finalStates, setFinalStates] = useState(['A', 'C']);
//   const [transitionTable, setTransitionTable] = useState({});
//   const [inputString, setInputString] = useState("");
//   const [result, setResult] = useState("");
//   const [error, setError] = useState("");

//   const handleLanguagesChange = (index, value) => {
//     const newLanguages = [...languages];
//     newLanguages[index] = value;
//     setLanguages(newLanguages);
//   };

//   const handleStatesChange = (index, value) => {
//     const newStates = [...states];
//     newStates[index] = value;
//     setStates(newStates);
//   };

//   const handleFinalStatesChange = (index, value) => {
//     const newFinalStates = [...finalStates];
//     newFinalStates[index] = value;
//     setFinalStates(newFinalStates);
//   };

//   const handleTransitionChange = (state, language, value) => {
//     setTransitionTable((prev) => ({
//       ...prev,
//       [state]: { ...prev[state], [language]: value },
//     }));
//   };

//   const validateInputs = () => {
//     if (!states.includes(initialState)) {
//       setError("Invalid initial state.");
//       return false;
//     }

//     for (const finalState of finalStates) {
//       if (!states.includes(finalState)) {
//         setError("Invalid final state(s).");
//         return false;
//       }
//     }

//     setError("");
//     return true;
//   };

//   const handleCheckString = () => {
//     if (!validateInputs()) {
//       return;
//     }

//     let currentState = initialState;
//     for (const char of inputString) {
//       if (!transitionTable[currentState] || !transitionTable[currentState][char]) {
//         setResult("The string is not accepted.");
//         return;
//       }
//       currentState = transitionTable[currentState][char];
//     }
//     if (finalStates.includes(currentState)) {
//       setResult("The string is accepted.");
//     } else {
//       setResult("The string is not accepted.");
//     }
//   };

//   const shouldDisable = (currentState) => {
//     const stateTransitions = transitionTable[initialState] || {};
//     const firstTwoTransitions = [stateTransitions[languages[0]], stateTransitions[languages[1]]];
//     const initialTransitionCount = firstTwoTransitions.filter(transition => transition === initialState).length;

//     return initialTransitionCount >= 2;
//   };

//   return (
//     <div className='full-wrapper'>
//       <div className='main-wrapper scrollbar-style'>
//         <h1>DFA Simulator</h1>
//         <div className='mb-10'>
//           <label className='mb-5'>Number of Languages:</label>
//           <input
//             type="number"
//             value={numLanguages}
//             onChange={(e) => {
//               const value = Math.max(0, parseInt(e.target.value, 10) || 0);
//               setNumLanguages(value);
//               setLanguages(Array(value).fill(""));
//             }}
//           />
//         </div>
//         {languages.map((language, index) => (
//           <div key={index}>
//             <label className='mb-5'>Language {index + 1}:</label>
//             <input
//               type="text"
//               value={language}
//               onChange={(e) => handleLanguagesChange(index, e.target.value)}
//             />
//           </div>
//         ))}
//         <div>
//           <label className='mb-5'>Number of States:</label>
//           <input
//             type="number"
//             value={numStates}
//             onChange={(e) => {
//               const value = Math.max(0, parseInt(e.target.value, 10) || 0);
//               setNumStates(value);
//               setStates(Array(value).fill(""));
//             }}
//           />
//         </div>
//         {states.map((state, index) => (
//           <div key={index}>
//             <label className='mb-5'>State {index + 1}:</label>
//             <input
//               type="text"
//               value={state}
//               onChange={(e) => handleStatesChange(index, e.target.value)}
//             />
//           </div>
//         ))}
//         <div>
//           <label className='mb-5'>Initial State:</label>
//           <input
//             type="text"
//             value={initialState}
//             onChange={(e) => setInitialState(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className='mb-5'>Number of Final States:</label>
//           <input
//             type="number"
//             value={numFinalStates}
//             onChange={(e) => {
//               const value = Math.max(0, parseInt(e.target.value, 10) || 0);
//               setNumFinalStates(value);
//               setFinalStates(Array(value).fill(""));
//             }}
//           />
//         </div>
//         {finalStates.map((state, index) => (
//           <div key={index}>
//             <label className='mb-5'>Final State {index + 1}:</label>
//             <input
//               type="text"
//               value={state}
//               onChange={(e) => handleFinalStatesChange(index, e.target.value)}
//             />
//           </div>
//         ))}

//         {states.map((state, stateIndex) => (
//           <div key={stateIndex}>
//             <h3>{`If at state ${state} and`}</h3>
//             {languages.map((language, languageIndex) => (
//               <div key={languageIndex}>
//                 {transitionTable[state] && transitionTable[state][language] === initialState ? null : (
//                   <>
//                     <label className='mb-5'>{`language ${language} occurs`}:</label>
//                     <input
//                       type="text"
//                       value={transitionTable[state]?.[language] || ""}
//                       onChange={(e) => handleTransitionChange(state, language, e.target.value)}
//                       disabled={shouldDisable(state) && (languageIndex < 2)}
//                     />
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}

//         <h2>Transition Table</h2>
//         <table>
//           <thead>
//             <tr>
//               <th></th>
//               <th></th>
//               {languages.map((item, index) => (<th key={index}>{item}</th>))}
//             </tr>
//           </thead>
//           <tbody>
//             {states.map((state, index) => (
//               <tr key={state}>
//                 <td>
//                   {initialState === state ? '-->' : ''}
//                 </td>
//                 <td>
//                   {state}
//                   {finalStates.includes(state) ? '*' : ''}
//                 </td>
//                 {languages.map((language, languageIndex) => (
//                   <td key={languageIndex}>{transitionTable[state]?.[language]}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div>
//           <label className='mb-5'>Enter a string to check:</label>
//           <input
//             type="text"
//             value={inputString}
//             onChange={(e) => setInputString(e.target.value)}
//           />
//           <button onClick={handleCheckString}>Check String</button>
//         </div>
//         <div>{result}</div>
//         {error && <div className="error">{error}</div>}
//       </div>
//     </div>
//   );
// }

// export default DFA;


import { useState } from 'react';
import "./App.css";

function DFA() {
  const [numLanguages, setNumLanguages] = useState(0);
  const [numStates, setNumStates] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [states, setStates] = useState([]);
  const [initialState, setInitialState] = useState();
  const [numFinalStates, setNumFinalStates] = useState(0);
  const [finalStates, setFinalStates] = useState([]);
  const [transitionTable, setTransitionTable] = useState({});
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleLanguagesChange = (index, value) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  const handleStatesChange = (index, value) => {
    const newStates = [...states];
    newStates[index] = value;
    setStates(newStates);
  };

  const handleFinalStatesChange = (index, value) => {
    const newFinalStates = [...finalStates];
    newFinalStates[index] = value;
    setFinalStates(newFinalStates);
  };

  const handleTransitionChange = (state, language, value) => {
    setTransitionTable((prev) => ({
      ...prev,
      [state]: { ...prev[state], [language]: value },
    }));
  };

  const validateInputs = () => {
    if (!states.includes(initialState)) {
      setError("Invalid initial state.");
      return false;
    }

    for (const finalState of finalStates) {
      if (!states.includes(finalState)) {
        setError("Invalid final state(s).");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleCheckString = () => {
    if (!validateInputs()) {
      return;
    }

    let currentState = initialState;
    for (const char of inputString) {
      if (!transitionTable[currentState] || !transitionTable[currentState][char]) {
        setResult("The string is not accepted.");
        return;
      }
      currentState = transitionTable[currentState][char];
    }
    if (finalStates.includes(currentState)) {
      setResult("The string is accepted.");
    } else {
      setResult("The string is not accepted.");
    }
  };

  const shouldDisable = (currentState) => {
    const stateTransitions = transitionTable[initialState] || {};
    const firstTwoTransitions = [stateTransitions[languages[0]], stateTransitions[languages[1]]];
    const initialTransitionCount = firstTwoTransitions.filter(transition => transition === initialState).length;

    return initialTransitionCount >= 2;
  };

  return (
    <div className='full-wrapper'>
      <div className='main-wrapper scrollbar-style'>
        <h1>DFA Simulator</h1>
        <div className='mb-10'>
          <label className='mb-5'>Number of Languages:</label>
          <input
            type="number"
            value={numLanguages}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value, 10) || 0);
              setNumLanguages(value);
              setLanguages(Array(value).fill(""));
            }}
          />
        </div>
        {languages.map((language, index) => (
          <div key={index}>
            <label className='mb-5'>Language {index + 1}:</label>
            <input
              type="text"
              value={language}
              onChange={(e) => handleLanguagesChange(index, e.target.value)}
            />
          </div>
        ))}
        <div>
          <label className='mb-5'>Number of States:</label>
          <input
            type="number"
            value={numStates}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value, 10) || 0);
              setNumStates(value);
              setStates(Array(value).fill(""));
            }}
          />
        </div>
        {states.map((state, index) => (
          <div key={index}>
            <label className='mb-5'>State {index + 1}:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => handleStatesChange(index, e.target.value)}
            />
          </div>
        ))}
        <div>
          <label className='mb-5'>Initial State:</label>
          <input
            type="text"
            value={initialState}
            onChange={(e) => {
              let value = e.target.value;
              if (value && !states.includes(value)) {
                alert("Invalid initial state.");
              } else {
                setInitialState(value);
              }
            }}
          />
        </div>
        <div>
          <label className='mb-5'>Number of Final States:</label>
          <input
            type="number"
            value={numFinalStates}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value, 10) || 0);
              setNumFinalStates(value);
              setFinalStates(Array(value).fill(""));
            }}
          />
        </div>
        {finalStates.map((state, index) => (
          <div key={index}>
            <label className='mb-5'>Final State {index + 1}:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => {
                if (e.target.value && !states.includes(e.target.value)) {
                  alert("Invalid final state.");
                }
                handleFinalStatesChange(index, e.target.value)
              }}
            />
          </div>
        ))}

        {states.map((state, stateIndex) => (
          <div key={stateIndex}>
            <h3>{`If at state ${state} and`}</h3>
            {languages.map((language, languageIndex) => (
              <div key={languageIndex}>
                {transitionTable[state] && transitionTable[state][language] === initialState ? null : (
                  <>
                    <label className='mb-5'>{`language ${language} occurs`}:</label>
                    <input
                      type="text"
                      value={transitionTable[state]?.[language] || ""}
                      onChange={(e) => handleTransitionChange(state, language, e.target.value)}
                      disabled={shouldDisable(state) && (languageIndex < 2)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}

        <h2>Transition Table</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              {languages.map((item, index) => (<th key={index}>{item}</th>))}
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => (
              <tr key={state}>
                <td>
                  {initialState === state ? '-->' : ''}
                </td>
                <td>
                  {state}
                  {finalStates.includes(state) ? '*' : ''}
                </td>
                {languages.map((language, languageIndex) => (
                  <td key={languageIndex}>{transitionTable[state]?.[language]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <label className='mb-5'>Enter a string to check:</label>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
          />
          <button onClick={handleCheckString}>Check String</button>
        </div>
        <div>{result}</div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default DFA;
