import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { EditPage, Home, LoginPage, SignUpPage, User } from './pages';
import { SessionProvider } from './context/userContext';
import AddEmployee from './pages/emplyeeRelated/addEmployee';

function App() {
  return (
    <>
      <Router>
        <SessionProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/user/:id' element={<User />} />
                <Route path='/edit/:id' element={<EditPage />} />
                <Route path='/addEmployee'element={<AddEmployee />} />
              </Routes>
        </SessionProvider>

      </Router>
    </>
  );
}

export default App;
