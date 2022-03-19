import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SignIn from './components/Auth/SignIn';
import Signup from './components/Auth/SignUp';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// import UserHomePage from './components/UserHomePage/UserHomePage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import UserProfilePageCreate from './components/UserProfilePage/UserProfilePageCreate';
import UserPurchaseHistory from './components/UserPurchasePage/UserPurchaseHistory';

import Shop from './components/Shop/Shop';
import ShopOwner from './components/Shop/ShopOwner';
import ShopCreate from './components/ShopCreate/ShopCreate';

import Item from './components/Item/Item';
import ItemCreate from './components/ItemCreate/ItemCreate';

import Category from './components/Category/Category';

import Search from './components/Search/Search';
import SearchShop from './components/Search/SearchShop';
import SearchUser from './components/Search/SearchUser';

import UserFavorites from './components/UserFavourites/UserFavourites';

import Cart from './components/Cart/Cart';

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <Navbar/> 
        </nav>
          <Routes>
            {/* <Route exact path ="/" element={ <Home/>}/> */}
            
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<Signup />} />

            {/* <Route exact path ="/userhome" element={ <UserHomePage/>}/> */}
            {/* <Route exact path="/userprofile" element={<UserProfilePage/>}  /> */}
            {/* <Route exact path="/userprofilecreate" element={<UserProfilePageCreate/>}  /> */}
            {/* <Route exact path="/userpurchases" element={<UserPurchaseHistory/>} /> */}

            {/* <Route path="/shop">  <Shop /> </Route> */}
            {/* <Route path="/shopowner">  <ShopOwner /> </Route> */}
            {/* <Route path="/shopcreate">  <ShopCreate /> </Route> */}

            {/* <Route path="/item"> <Item />  </Route> */}
            {/* <Route path="/itemcreate"> <ItemCreate />  </Route> */}

            {/* <Route path="/category"> <Category />  </Route> */}

            {/* <Route path="/search"> <Search />  </Route> */}
            {/* <Route path="/searchshop"> <SearchShop />  </Route> */}
            {/* <Route path="/searchuser"> <SearchUser />  </Route> */}

            {/* <Route path="/userfavourites">  <UserFavorites /> </Route> */}

            {/* <Route path="/cart" element={<Cart/>} /> */}
            
          </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
