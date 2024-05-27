
import './App.css'
import HeaderComponent from './HeaderComponent';
import ListEmployeeComponent from './ListEmployeeComponent';
import FooterComponent from './FooterComponent'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import EmployeeComponent from './EmployeeComponent';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<ListEmployeeComponent/>}/>
        <Route path='/employees' element = {<ListEmployeeComponent/>}/>
        <Route path='/add-employee' element = {<EmployeeComponent/>}/>
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}/>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
  );
}

export default App
