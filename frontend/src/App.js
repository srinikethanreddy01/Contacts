import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Details from './Pages/Details';
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </Router>
  );
}

export default App;
