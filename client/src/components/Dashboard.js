import React from "react";
import cookie from "react-cookies";

function Dashboard() {
  return (
    <div>
      <div className="dash_board">
        <h1 className="title">Welcome to Etsy, {cookie.load("user")}!</h1>
        <div className="dashboard_items">
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/8505634/r/il/3cfcca/3016768150/il_300x300.3016768150_9thy.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px" ,textAlign:"center"}}>Gifts for Mom</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/5395361/r/il/f22821/1118367255/il_300x300.1118367255_k17t.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px", marginLeft: "-10%" ,textAlign:"center"}}>
              Necklaces
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/15249051/r/il/6c00cb/3730064431/il_300x300.3730064431_ndck.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px", marginLeft: "-10%",textAlign:"center" }}>
              Gift baskets
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/9341357/r/il/0146f9/3323020889/il_300x300.3323020889_qli1.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px", marginLeft: "10%",textAlign:"center" }}>Linen Clothing</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/21713476/r/il/c61161/3775624801/il_300x300.3775624801_htkn.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px", marginLeft: "-10%" ,textAlign:"center"}}>
              Easter
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/22434491/r/il/27c541/3125257928/il_300x300.3125257928_op93.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "16px", marginLeft: "-15%",textAlign:"center" }}>
              On Sale 
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
