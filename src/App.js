import './App.css';
import Family from './components/recursive-data';
const familyTree = {
  // First Grandfather
  grandfather1: {
    name: "John",
    age: 90,
    children: [
      {
        name: "Mary",
        age: 60,
      },
      {
        name: "Arthur",
        age: 60,
        children: [
          {
            name: "Lily",
            age: 35,
            children: [
              {
                name: "Hank",
                age: 60,
              },
              {
                name: "Henry",
                age: 57,
              },
            ],
          },
          {
            name: "Billy",
            age: 37,
          },
        ],
      },
      {
        name: "Dolores",
        age: 55,
      },
    ],
  },

  // Second Grandfather
  grandfather2: {
    name: "William",
    age: 85,
    children: [
      {
        name: "Sarah",
        age: 58,
      },
      {
        name: "James",
        age: 62,
      },
    ],
  },

  // Third Grandfather
  grandfather3: {
    name: "Robert",
    age: 80,
    children: [
      {
        name: "Emily",
        age: 55,
        children: [
          {
            name: "Jacob",
            age: 30,
          },
          {
            name: "Olivia",
            age: 28,
          },
        ],
      },
      {
        name: "Thomas",
        age: 50,
      },
    ],
  },

  // Add more grandfathers as needed...
};


function App() {
  return (
    <>
    <Family familyTree={familyTree}/>
    </>
  );
}

export default App;
