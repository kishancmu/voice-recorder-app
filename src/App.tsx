import Header from "./components/Header/Header";
import Recorder from "./components/Recorder/Recorder";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header title="Voice Recorder App" />
      <Recorder />
    </div>
  );
}

export default App;
