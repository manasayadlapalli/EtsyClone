module.exports = {
  HOST: "mysql-test.cxmochu07w7u.us-west-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "12121212",
  DB: "test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};