import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userSlice, { selectUser } from "../../features/userSlice";
import CloseLogin from "../closeLogin";
import Axios from "axios";

const editShopImage = ({ editShopPage }) => {
  const [shopImage, setShopImage] = useState("");
  const [product, setProduct] = useState();
  const [productExist, setProductExist] = useState(false);
  const user = useSelector(selectUser);

  const editImage = (e) => {
    e.preventDefault();
    editShopPage(false);

    const formData = new FormData();
    formData.append("shopImage", shopImage);
    console.log("Shop image update");
    Axios.put(
      "http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/updateShopImageById/" + user.id,
      formData
    ).then((response) => {
      if (response.data.success) {
        console.log(response);

        console.log("Item details edited successfully.....");
        window.location.pathname = "/shopHome";
      }
    });
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = () => {
    Axios.get("http://ec2-13-56-211-75.us-west-1.compute.amazonaws.com:4000/getShopById/" + user.id).then(
      (response) => {
        if (response) {
          setShopImage(response.data.result.shopImage);
        }
      }
    );
  };
  return (
    <div className="bg-modal">
      <div className="modal-content">
        <CloseLogin setshowSignIn={editShopPage} />
        <h2 className="addProd_title">Add product</h2>
        <form className="items_form" encType="multipart/form-data">
          <div className="htmlForm-group">
            <label htmlFor="item_image">Shop Image</label>
            <br />
            <input
              style={{ border: "none" }}
              type="file"
              name="shopImage"
              className="item_image"
              id="item_image"
              onChange={(event) => {
                setShopImage(event.target.files);
              }}
              required
            />
          </div>

          <div>
            <button
              style={{
                marginTop: "5%",
                width: "90%",
                borderRadius: "4px",
                padding: "5px",
                backgroundColor: "gray",
                border: "none",
                color: "white",
              }}
              onClick={editImage}
            >
              Update Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default editShopImage;
