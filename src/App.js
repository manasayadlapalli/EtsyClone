import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/authentication/Login'
import SignUp from './components/authentication/SignUp'
import Home from './components/ViewPages/Home'
import favorites from './components/ViewPages/favorites';
import cart from './components/ViewPages/cart'
class App extends Component{
    render(){
        return(
           <BrowserRouter>
           <Navbar/>
           <Switch>
             <Route path = "/" exact component ={Home}/>
             <Route path = "/Login" exact component ={Login}/>
             <Route path = "/favorites" exact component={favorites}/>            
             <Route path = "/cart" exact component ={cart}/>  
             <Route path = "/SignUp" exact component ={SignUp}/>  

           </Switch>
           </BrowserRouter>
        );
    }
}

export default App