import './App.css';
import { GreenSmallButton, RedButton, RedSmallButton } from './components/partial-components';
function App() {
  return (
    <>
    <RedButton text="I m red button from partial-components"/>
    <RedSmallButton text='I m red button from partial-components with small size'/>
    <GreenSmallButton text='I m green button from partial-components with small size'/>
    </>
  );
}

export default App;
