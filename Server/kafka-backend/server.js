var connection = new require('./kafka/Connection');

//MongoDB connection
require('./ConnectionMongo')

// Topic files
var getItems = require('./services/getItems')
var getSearchItems = require('./services/getSearchItems')

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('kafka server is running ');
    consumer.on('message', function (message) {
        console.log('message received for: ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log("payload sent",data);
            });
            return;
        });

    });
}

// Topics are added here
handleTopicRequest("getItems", getItems)
handleTopicRequest("getSearchItems", getSearchItems)