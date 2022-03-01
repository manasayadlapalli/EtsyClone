import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Navigate} from 'react-router';
import {Nav,NavLink,Bars,NavMenu} from './NavBarElements';
import { GrFavorite } from 'react-icons/gr';
import {BsCart4} from  'react-icons/bs';
import {IoMdNotificationsOutline} from'react-icons/io';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Navigate to="/home"/>
        }
        return(
        <div>
         <Nav className='Nav1'>
            <NavLink to='/'><img src ={require('../../images/logo.png')} alt = "logo" width="84" height="43"/>
            </NavLink>
            <NavMenu>
            <input type='text' className='search' placeholder='Search for anything'></input>
            <NavLink to='/favorites'><GrFavorite/></NavLink>
            <NavLink to='/notifications' ><IoMdNotificationsOutline color="black" fontSize="1.5em"  /></NavLink>
            <div className='searchIcon'></div>
            <NavLink to='/Login'><button onClick="">Login</button></NavLink>
            <NavLink to='/cart'><BsCart4 color="black" fontSize="1.5em" /></NavLink>
            </NavMenu>
            </Nav>   
            
            <Nav className='Nav2'>
            <NavLink to='/homeFavorites'  >Home Favorites </NavLink>
            <NavLink to='/jewelryAccesorries'>Jewelry & Accesorries </NavLink>
            <NavLink to='/clothingShoes'>Clothing & Shoes </NavLink>
            <NavLink to='/homeLiving'>Home & Living </NavLink>
            <NavLink to='/weddingParty'>Wedding & Party </NavLink>
            <NavLink to='/toysEntertainment'>Toys & Entertainment </NavLink>
            <NavLink to='/artCollectibles'>Art & Collectibles </NavLink>
            <NavLink to='/craftSupplies' >Craft Supplies </NavLink>
            <NavLink to='/giftsGiftCards'>Gifts & Gift Cards </NavLink>
            </Nav>   
        </div>
        )
    }
}

export default Navbar