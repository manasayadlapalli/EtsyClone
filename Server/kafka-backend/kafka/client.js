var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("---> In kafka: make_request <---");
  console.log("message_payload: ", msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function (error, response) {
    if (error) {
      console.log("make_request: error: ", error);
      callback(error, null);
    } else {
      //console.log("make_request: response: ", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
