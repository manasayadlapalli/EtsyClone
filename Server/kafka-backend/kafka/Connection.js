var kafka = require("kafka-node");

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
        this.client = new kafka.KafkaClient("ec2-13-56-211-75.us-west-1.compute.amazonaws.com:2181");
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
        this.client.on("ready", function () { console.log("---> Connection client ready! <---") });
    
      return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
       if (!this.kafkaProducerConnection) {
          this.client = new kafka.KafkaClient("ec2-13-56-211-75.us-west-1.compute.amazonaws.com:2181");
          var HighLevelProducer = kafka.HighLevelProducer;
          this.kafkaProducerConnection = new HighLevelProducer(this.client);
          console.log("---> Connection producer ready <---");
        }
      return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
