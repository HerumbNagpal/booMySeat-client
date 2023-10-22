import './App.css';
import DisplaySeats from './components/DisplaySeats';
// import Exampl from './components/Exampl';

function App() {
  return (
    <div className="App" style={{backgroundColor:"#161616",height:'106vh',overflowY:'scroll',marginTop:'-25px'}} >
      <DisplaySeats/>
      {/* <Exampl/> */}
    </div>
  );
}

export default App;
