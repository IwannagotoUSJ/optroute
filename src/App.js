import './App.css';
import GA from './genetic_algo';

function App() {

  function debug(){
    const ga = new GA();
    ga.run();
    //
  }

  return (
    <div className="App">
      <button onClick={()=>{debug()}}>debugbottun</button>
    </div>
  );
}

export default App;
