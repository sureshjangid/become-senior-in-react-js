import './App.css';
import LargeListItems from './components/authors/LargeListItems';
import SmallListItems from './components/authors/SmallListItems';
import { authors } from './components/data/authors';
import { books } from './components/data/books';
import RegularList from './components/lists/Regular';
import LargeList from './components/books/LargeListItems';
import SmallList from './components/books/SmallListItems';



function App() {
  return (
    <>

{/* <RegularList item={authors} sourceName={'authors'} ItemComponents={SmallListItems}/> */}
{/* <RegularList item={authors} sourceName={'authors'} ItemComponents={LargeListItems}/> */}
<RegularList item={books} sourceName={'books'} ItemComponents={LargeList}/>

<RegularList item={books} sourceName={'books'} ItemComponents={SmallList}/>

    </>
  );
}

export default App;
