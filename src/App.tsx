import Select from "./Select";
import { OPTIONS } from "./mocks";

function App() {
  return (
    <div style={{paddingLeft: "200px", paddingTop: "20px"}}>
      <Select options={OPTIONS} />
    </div>
  );
}

export default App;
