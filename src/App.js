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
    We have way to used SplitPage 
    {/* first one */}
    {/* <SplitPage Left={LeftSide} Right={RightSide} leftWidth={1} rightWidth={3}/> */}

    {/* second one */}
    <SplitPage leftWidth={1} rightWidth={3}>
    <LeftSide title={'I m LeftOne!'}/>
    <RightSide title={'I m RightOne!'}/>
    </SplitPage>

    </>
  );
}

export default App;
