var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
const chai = require('chai')
var expect = require('chai').expect;
const should = chai.should();
const chaiHttp = require("chai-http")
var app = require('./index');

chai.use(chaiHttp);

describe("/Server connection",()=>{
    it('Make connection to API',(done)=>{
        chai.request(server)
        .get('/makeconnection')
        .end((err,res)=>{
            res.should.have.status(200)
            done();
        })
    })

    it('User must be registered in order to login', (done) => {
        chai.request(server)
        .post('/login')
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

       
        it('Shop Name should be unique', (done) => {
            chai.request(server)
            .get('/checkshopname')
            .send({
                "shopname" : "No duplicates"
             })
            .end((err, res) => {
              comment = res.body
              expect(res.status).to.eq(200)
              done();
            })
          })

      
      

})