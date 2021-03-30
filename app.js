// console.log = function(){}  //Uncomment for production
require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require("socket.io")(http);
const mqtt = require('mqtt')

var options = {
  keepalive: 60,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  port:1883,

}
const host = 'mqtt://test.mosquitto.org'
var connectedClients = 0
var TopicHumidity = 'YNOV/BDX/DHT11/24:62:AB:FD:C8:18/HUM';
var TopicTemp ='YNOV/BDX/DHT11/24:62:AB:FD:C8:18/TEMP';


var client = mqtt.connect(host, options)


client.on('error', function (err) {
  console.log(err)
  client.end()
})

io.on('connection', socket => {
  socket.on('disconnect', () => {
    connectedClients--
    console.log('Client left: ', connectedClients)
  })
  connectedClients++
  console.log('New client: ', connectedClients)
})

client.subscribe(TopicHumidity)
client.subscribe(TopicTemp)
client.on('message', (topic, message) => {
  const verify = (data) => {

    if(topic === TopicTemp){
      io.emit('temp',data.toString())
    }

    if(topic === TopicHumidity){
      io.emit('hum',data.toString())
    }

  }
  verify(message);
  console.log('Topic: ' + topic + '\nMessage: ', message.toString())

})

http.listen(8080, () => {
  console.log('Listening on port 8080')
})
