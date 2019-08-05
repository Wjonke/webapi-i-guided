// import express from 'express'
const express = require('express')
// import the hubs-model file
const Hubs = require('./data/hubs-model.js')
// Hubs has a find() findById(), add(), remove(), update(), methods



const server = express();
server.use(express.json())

// a client makes requests to the server(api) res= response from api   req = request from client
server.get('/', (req, res) => {
  res.send('Hello World')
})

//see a list of hubs(like a channel list in slack)
server.get('/hubs', (req, res)=> {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch( error => {
      res.status(500).json({message: 'error getting the list of hubs'})
  })
})


//create/post a hub
server.post('/hubs', (req, res)=> {
  const hubInformation = req.body;
  Hubs.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch( error => {
      res.status(500).json({message: 'error adding to the list of hubs'})
  })
})

//delete a hub
server.delete('/hubs/:id', (req, res)=> {
  const hubId = req.params.id;
  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({message: 'hub deleted successfully'});
    })
    .catch( error => {
      res.status(500).json({message: 'error deleting the hub'})
  })
})

//update a hub




// the server must listen for requests on a particular prompt. This is almost always the last line of this file.
const port = 8000;
server.listen(port, () => console.log('api is running'));