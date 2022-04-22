import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Axios from "axios";
import { createCart, getCart, } from "../features/purchaseSlice";
import { selectUser } from "../features/userSlice";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";
import "./CartItem.css";
import Pagination from './Pagination';
import Moment from 'react-moment';


const Purchases = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const products = useSelector(getCart);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(5);

    const qtyChangeHandler = (qty) => {

        console.log("pagination");
        console.log("qty",qty);

        setPostsPerPage(qty);
        
        console.log("postsPerPage",postsPerPage);};

    useEffect(() => { getCartItems(); }, []);

    const getCartItems = () => {
        setLoading(true);
        Axios.get("http://localhost:4000/getPurchases/" + user.id).then(
            (response) => {
                setPosts(response.data.result);
                dispatch(createCart(response.data.result));
                if (response.data.success === true) {
                    setLoading(false);
                }
            });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        console.log("pageNumber", pageNumber);
        console.log('currentPage', currentPage);

    };

    return (
        <>
            <Navbar />
            <Hoverbar />
            <hr></hr>
            <div className="purchasePage">
                <div className="purchasePage_items">
                    <h2>Purchases</h2>
                    <p>Number of purchases per page</p>
                    <select value={postsPerPage} onChange={(e) => qtyChangeHandler(e.target.value)}  >
                        {[2, 5, 10].map((x) => (
                            <option key={x} value={x}>
                                {x}
                            </option>
                        ))}
                    </select>
                    {currentPosts.length === 0 ? (<div> You have no previous purchases. <Link to="/">Go Back</Link> </div>) : (
                        currentPosts.map((item) => (

                            <div className="cart_pag" style={{ display: "flex", width: "100%", height: "200px", }} >
                                <div className="cartitem">
                                    <p className="cartitem__price"><u>Order ID:</u> {item._id}</p>
                                    {
                                        //console.log(item)
                                    }
                                    <p className="cartitem__price"><u>Purchased On:</u><Moment format='MMMM Do YYYY, h:mm:ss a'>{item.updatedAt}</Moment></p>
                                    
                                    <Link to={`/product/${item.product}`} className="cartItem__name">
                                        <p>{item.itemId.itemName}</p>
                                        <p className="cartitem__price">${item.itemId.itemPrice}</p>
                                    </Link>
                                    <div className="purchasePage_items_image">
                                        <img src={ item.itemId.itemImage} alt={item.itemId.itemName} width={150} height={156} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
                </div>

            </div>

        </>
    );
};

export default Purchases;