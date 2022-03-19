import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SignIn from './components/Auth/SignIn';
import Signup from './components/Auth/SignUp';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import UserProfilePage from './components/UserProfilePage/UserProfilePage';
//import Cart from './components/Cart/Cart';
//import RegisterShop from './components/UserShopRegister/RegisterShop';
//import Favorites from './components/Favorites/Favorites';
import CategoryCard from './components/CategoryCard/CategoryCard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <nav>
          <Navbar/> 
        </nav>
          <Routes>
            <Route exact path ="/" element={ <CategoryCard/>}/>
            <Route exact path="/profile" element={<UserProfilePage/>}  />
           
            <Route exact path="/signin" element={<SignIn />} />
            {/* <Route path="/data"> <Datarender />  </Route> */}
            {/* <Route path="/upload">  <Upload /> </Route> */}
            {/* <Route path="/cart" element={<Cart/>} /> */}
            {/* <Route path="/favorites" element={<Favorites />} /> */}
            {/* <Route path="/purchases"> <Purchases />  </Route> */}
            <Route exact path="/signup" element={<Signup />} />
            {/* <Route path="/Shop">  <ShoppingHome /> </Route> */}
            {/* <Route path="/registerShop" element={<RegisterShop/>} /> */}
            {/* <Route path="/individualshop"> <IndividualShop />  </Route>
            <Route path="/individualproduct/:id"> <IndividualProduct />  </Route>
            <Route path="/shoppingpage"> <IndividualShop /> </Route>
            <Route path="/search">  <SearchResults />  </Route>
            <Route path="/ptest"> <ParamsExample />  </Route>  */}
          </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
