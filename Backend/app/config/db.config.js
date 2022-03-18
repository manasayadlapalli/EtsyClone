module.exports = {
  HOST: "mysql-cmpe273-lab1.czsizzvuqd3q.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "12345678",
  DB: "etsydb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};