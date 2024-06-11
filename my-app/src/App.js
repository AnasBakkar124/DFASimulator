import { useState } from 'react';
import "./App.css";

function DFA() {
  const [numLanguages, setNumLanguages] = useState(0);
  const [numStates, setNumStates] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [states, setStates] = useState([]);
  const [initialState, setInitialState] = useState();
  const [numFinalStates, setNumFinalStates] = useState();
  const [finalStates, setFinalStates] = useState([]);
  const [transitionTable, setTransitionTable] = useState({});
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState("");

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

  const handleCheckString = () => {
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


  return (
    <div className='main-wrapper scrollbar-style'>
      <h1>DFA Simulator</h1>
      <div>
        <label>Number of Languages:</label>
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
          <label>Language {index + 1}:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => handleLanguagesChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>
        <label>Number of States:</label>
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
          <label>State {index + 1}:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => handleStatesChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>
        <label>Initial State:</label>
        <input
          type="text"
          value={initialState}
          onChange={(e) => setInitialState(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Final States:</label>
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
          <label>Final State {index + 1}:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => handleFinalStatesChange(index, e.target.value)}
          />
        </div>
      ))}
      <div>


        {states.map((state, stateIndex) => (
          <div key={stateIndex}>
            <h3>{`If at state ${state} and`}</h3>
            {languages.map((language, languageIndex) => (
              <div key={languageIndex}>
                <label>{`language ${language} occurs`}:</label>
                <input
                  type="text"
                  value={transitionTable[state]?.[language] || ""}
                  onChange={(e) =>
                    handleTransitionChange(state, language, e.target.value)
                  }
                />
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
              {languages.map((item) => (<th>{item}</th>))}
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
                <td>{transitionTable[states[index]]?.a}</td>
                <td>{transitionTable[states[index]]?.b}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>Enter a string to check:</label>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
        />
        <button onClick={handleCheckString}>Check String</button>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default DFA;