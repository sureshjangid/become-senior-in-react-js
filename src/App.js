import './App.css';
import { logProps } from './components/log-props';
import { UserInfo } from './components/user-info';


const UserWrapperHOC =  logProps(UserInfo)
function App() {
  return (
    <>
    <UserWrapperHOC name="suresh" profile="Software Developer" company="Zentek"/>
    </>
  );
}

export default App;
