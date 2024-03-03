import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Page1 from './components/page1.jsx';
import Page2 from './components/page2.jsx';
import Employee from './components/Empolyee.jsx';



function App() {
  return ( 
 
  <Router>
    
    <Routes>
       <Route path="/" element={<Page1/>}/>
       <Route path="/page2/:employeeId" element={<Page2/>}/>
       <Route path="/page3" element={<Employee/>}/>
       

    </Routes>
 
    
  </Router>

  );
}

export default App;