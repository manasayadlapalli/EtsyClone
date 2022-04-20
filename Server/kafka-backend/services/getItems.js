const Items = require('../../models/Itemsmodel');

function handle_request(msg, callback){
    console.log("In getItems kafka handle_request");
    try{
        Items.find({}, (err, result) => {
              callback(null, err ? err : {success: true, result});
            });
    } catch(err) {
        console.log(err);
        callback(null, 'Internal Server Error.');
      }
  };
exports.handle_request = handle_request;


