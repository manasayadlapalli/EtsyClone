import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes,nav } from "react-router-dom";
import Footer from './components/Footer/Footer';
import UserProfileProfile from './components/UserProfilePage/UserProfilePage';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import RegisterShop from './components/UserShopRegister/RegisterShop';
import Favorites from './components/Favorites/Favorites';
import CategoryCard from './components/CategoryCard/CategoryCard';
import './App.css';

function App() {
  return (
    <div className="App">

     <Router>
       <nav>
      <Navbar/> 
      </nav>
      
         <Routes>
           <Route path ="/" element={ <CategoryCard/>}/>
           <Route path="/profile" element={<UserProfileProfile/>}  />
          
          <Route path="/login" element={<Login />} />
          {/* <Route path="/data"> <Datarender />  </Route> */}
          {/* <Route path="/upload">  <Upload /> </Route> */}
          <Route path="/cart" element={<Cart/>} />
          <Route path="/favorites" element={<Favorites />} />

          {/* <Route path="/purchases"> <Purchases />  </Route> */}
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/Shop">  <ShoppingHome /> </Route> */}
          <Route path="/registerShop" element={<RegisterShop/>} />
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
