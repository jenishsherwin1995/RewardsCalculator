import CustomerRewards from './components/CustomerRewards';
import { constants } from "./utils/constants";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>{constants.CUSTOM_REWARD_POINTS}</h2>
        <CustomerRewards />
      </header>
    </div>
  );
}

export default App;
