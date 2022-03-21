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
              src="https://i.etsystatic.com/12397853/r/il/505fa0/2426681051/il_300x300.2426681051_mocv.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px" }}>Wall Decor</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/29669210/r/il/48a8a1/3619807266/il_300x300.3619807266_4hg4.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Outdoor & Garden
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/8928370/r/il/f32f25/3376320499/il_300x300.3376320499_7sqq.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Kitchen & Dining
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/5395361/r/il/5bb896/3641190222/il_300x300.3641190222_fydq.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "10%" }}>Necklaces</h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-10%" }}>
              Wedding Decor
            </h3>
          </div>
          <div className="dashboard_item">
            <img
              src="https://i.etsystatic.com/10448437/r/il/8d7c57/1985247369/il_300x300.1985247369_d33t.jpg"
              alt="home"
            ></img>
            <h3 style={{ fontSize: "20px", marginLeft: "-15%" }}>
              On Sale & Discount
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
