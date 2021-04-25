import './App.css';
import GA from './genetic_algo';
import React, {useState, useEffect} from 'react';


function App() {
  const [result, setresult] = useState();

  function debug(){
    const ga = new GA();
    const best = ga.run();
    //
    let res = "s";
    for(let i=0;i<best[0].route.length;i++){
      res += "->";
      res += best[0].route[i];
    }
    res += "->s  [score = ";
    res += best[0].score;
    res += "]";
    setresult(res);
  }

  return (
    <div className="App">
      <button className="dbgbtn" onClick={()=>{debug()}}>debugbottun</button>
      <div>{result}</div>
    </div>
  );
}

export default App;
