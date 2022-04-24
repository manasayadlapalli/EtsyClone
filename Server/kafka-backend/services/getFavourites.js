const Favourites = require('../../models/Favouritesmodel');

function handle_request(msg, callback) {
    console.log("TYRE");
    try {
        Favourites.find()
                  .select({"userId":msg})
                  .populate("itemId")
                  .then((result) => {
                  callback(null, {success: true, result});
        });      

    } catch (err) {
      console.log(err);
      callback(null, 'Internal Server Error.');
    }
  };
  exports.handle_request = handle_request;
  