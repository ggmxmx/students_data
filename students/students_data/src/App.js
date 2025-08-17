import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const getData = axios.create({
    baseURL: 'http://localhost:3001/students',  
  })

function App() {

  getData.get('/')
    .then(response => {
      console.log(response.data);
    }
    )


  return (
    <div className="App">
    </div>
  );
}

export default App;
