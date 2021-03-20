import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Destination from './Components/Destination/Destination';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import SignUp from './Components/SingUp/SignUp';
import { createContext, useState } from 'react/cjs/react.development';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext =createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({})
  return (
   <UserContext.Provider value={[loggedInUser,setLoggedInUser]} className="App">
        <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">
          <Home></Home>
          </Route>
          <PrivateRoute path="/destination">
          <Destination/>
          </PrivateRoute>
          <Route path="/signUp">
          <SignUp/>
          </Route>
         
          <Route exact path="/">
          <Home></Home>
          </Route>
          <PrivateRoute path="/contact">
         <Contact/>
          </PrivateRoute>
          <Route path="/login">
          <Login/>
          </Route>
          <Route path="*">
          <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
   </UserContext.Provider>
  );
}

export default App;
