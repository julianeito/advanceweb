import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './components/Home';
import Contacts from './components/Contacts';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';

import AddProduct from './components/AddProduct';
import IndividualProduct from './components/IndividualProduct';
import Products from './components/Products'; // Keep only one import for Products

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="mainbody">
       
            <Switch>
              <Route exact path="/Home" component={Home} />
              <Route path="/AddProduct" component={AddProduct} />
              <Route path="/Products" component={Products} />
              <Route path="/IndividualProduct" component={IndividualProduct} />
              <Route path="/Contacts" component={Contacts} />
              <Route path="/Login" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;