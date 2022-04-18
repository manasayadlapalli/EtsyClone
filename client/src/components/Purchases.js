import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFinalCart } from "../features/cartItemsSlice";
import { selectUser } from "../features/userSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

function Purchases() {
  const user = useSelector(selectUser);
  const [purchaseHistory, setPurchasedHistory] = useState([]);

  useEffect(() => {
    getFinalCart();
  }, []);

  const getFinalCart = () => {
    Axios.get("http://localhost:4000/getPurchases/" + user.id).then(
      (response) => {
        if (response.data.success === true) {
          console.log("----------------Purchased products-------------------");
          console.log(response.data.result);
          setPurchasedHistory(response.data.result);
        }
      }
    );
  };

  let renderFavourites = null;

  // const purchasedProducts = JSON.parse(localStorage.getItem("purchase"));
  let purchasedProducts = []
  ;
  for (let i=0; i<purchaseHistory.length; i++) {

    let data = {
      "IDs" : purchaseHistory[i].itemIds
    }

    Axios.get("http://localhost:4000/getAllItemsbyIDs/" + JSON.stringify(data)).then(
      (response) => {
        console.log(i, response.data.result);
        purchasedProducts = response.data.result;
        // 
        renderFavourites = purchasedProducts.map((pro) => {
          return (
            "YES"
          );
        });
      }
    ); 
  } 


  // if (purchasedProducts.length === 0) {
  //   renderFavourites = () => {
  //     return <div>No orders found!</div>;    };
  // } else {
  //   renderFavourites = purchasedProducts.map((pro) => {
  //     return (
  //       <div className="home_cards col-md-4 mb-4">
  //         <div className="home_card card">
  //           <div
  //             style={{
  //               backgroundColor: "white",
  //               borderRadius: "50%",
  //               padding: "5px",
  //             }}
  //             className="favourite_icon"
  //             onClick={() => {
  //               // handleFavourite(pro.itemId, user.id);
  //             }}
  //           >
  //             <FavoriteBorderIcon />
  //           </div>
  //           <img
  //             src={pro.itemImage}
  //             className="card-img-top"
  //             alt="..."
  //           />
  //           <p className="home_price">
  //              ${pro.itemPrice}
  //           </p>

  //           <div className="card-body">
  //             <h5 className="card-title">{pro.itemName}</h5>

  //             <p className="card-text">{pro.itemDescription}</p>
  //             {/* <button className="btn-sm btn-dark">Edit</button> */}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  // }

  return (
    <>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <h2 style={{ marginLeft: "110px" }}> Purchases</h2>
      <h6 style={{ marginLeft: "110px" }}>Order ID: </h6>
      
      <div className="profile_favourites">
        <div className="container-fluid mx-1">
          <div className="row mt-5 mx-1">
            <div className="col-md-9">
              <div className="row"> {renderFavourites} </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Purchases;
