import './App.css';
import Card from './components/Card';
import cardData from './components/data.json';

function App() {
  return (
    <div>
      {cardData?.map((data, index) => (
        <Card key={index} >
          <Card.Image>
            <img style={{ width: "100%" }} src={data.imageUrl} alt={`Card ${index + 1}`} />
          </Card.Image>
          <Card.Header>
            {data.title}
          </Card.Header>
          <Card.Body>
            {data.body}
          </Card.Body>
          <Card.Footer>
            <a href={data.buttonUrl} className="btn btn-primary">{data.buttonText}</a>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

export default App;
