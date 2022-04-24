var chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
var app = require('../index');
var expect = chai.expect;

var agent = chai.request.agent(app);



it('Only registered Users can signin', (done) => {
  chai.request(app)
  .post('/signin')
  .send({
      email: "abc@gmail.com",
      password: "abc"
   })
  .end((err, res) => {
    comment = res.body
    expect(res.status).to.eq(200);
    done()
  })
})




describe("All products", ()=> {
    it("GET /getItems", function(done){
      agent
        .get("/getItems")
        .then(function (res) {
          console.log(res.data);
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          console.log("Error",e);
          done(e);
        });
    });
  });

  describe("Get User favourites for invalid user id", ()=> {
    it("GET getFavourites/:id", (done)=> {
      agent
        .get("getFavourites/:id")
        .send({ userId: '6255d78fa8a1cc7a3796e829'})
        .then(function (res) {
          expect(res).to.have.status(404);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("Find search term from searchbar", ()=> {
    it("GET getSearchItems/:searchValue", (done)=> {
      agent
        .get("/getSearchItems/:searchValue")
        .send({ searchValue: 'basket'})
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  // describe("Find invalid search term from searchbar", ()=> {
  //   it("GET getSearchItems/:searchValue", (done)=> {
  //     agent
  //       .get("/getSearchItems/:searchValue")
  //       .send({ searchValue: 'apple'})
  //       .then(function (res) {
  //         expect(res).to.have.status(404);
  //         done();
  //       })
  //       .catch((e) => {
  //         done(e);
  //       });
  //   });
  // });

  describe("Get purchases with invalid user id", ()=> {
    it("GET /getPurchases/:userId", (done)=> {
      agent
        .get("getPurchases/:userId")
        .send({ userId: '6254b0d5157e1123ee1a3792'})
        .then(function (res) {
          expect(res).to.have.status(404);
          done();
        })
        .catch((e) => {
          done(e);
        });
    });
  });