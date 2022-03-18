import { DropdownButton,Dropdown } from 'react-bootstrap';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import {AiOutlineShop} from 'react-icons/ai';
import {BiLogOut, } from 'react-icons/bi';
import {BsCart4} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.css";


class Navbar extends Component {
    constructor() {
        super();
        
        this.state = {
          showMenu: false,
        }        
        this.showMenu = this.showMenu.bind(this);
      }      
      showMenu(event) {
        event.preventDefault();
        
        this.setState({
          showMenu: true,
        });
      }
    render(){

     //   const { currentUser } = this.state;
       return(
           
        <div className='container'>
         <nav className='Nav1'>
           <Link to='/'><img src ={"https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg"} alt = "logo" width="84" height="43"/></Link><br/>&emsp;
            <input type='text' className='searchbar' placeholder='Search for anything'></input>
            <Link to='/favorites' ><GrFavorite size={22} /></Link>
            <Link to='/registerShop'><AiOutlineShop size={25}/></Link>
            <div className='searchIcon'></div>
            <Link to='/login'>Login</Link> 
            <Link to='/signup'>Signup</Link>
              <div>
            <DropdownButton title="Username">
            <Link to  ="/profile">User Profile</Link><br/>
            <Link to="/signout"><BiLogOut/>Signout</Link>
            </DropdownButton>
            </div>
            <Link to='/cart'><BsCart4 color="black" fontSize="1.5em" /></Link>
            </nav> <hr/>
      
            <h6>
            <nav className='Nav2'>
            <Link to='/homeFavorites'  >Home Favorites </Link>
            <Link to='/jewelryAccesorries'>Jewelry & Accesorries </Link>
            <Link to='/clothingShoes'>Clothing & Shoes </Link>
            <Link to='/homeLiving'>Home & Living </Link>
            <Link to='/weddingParty'>Wedding & Party </Link>
            <Link to='/toysEntertainment'>Toys & Entertainment </Link>
            <Link to='/artCollectibles'>Art & Collectibles </Link>
            <Link to='/craftSupplies' >Craft Supplies </Link>
            <Link to='/giftsGiftCards'>Gifts & Gift Cards </Link>
            </nav>   
            </h6> 
             <hr/>
             <footer/>
        </div>
        )
       }
}

export default Navbar