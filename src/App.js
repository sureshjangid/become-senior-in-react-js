import './App.css';
import { SplitPage } from './components/split-page';


const LeftSide = ({title})=>{
  return (
    <h1 style={{background:"red"}}> {title}</h1>
  )
}

const RightSide = ({title})=>{
  return (
    <h1 style={{background:"pink"}}> {title}</h1>
  )
}
function App() {
  return (
    <>


    </>
  );
}

export default App;
