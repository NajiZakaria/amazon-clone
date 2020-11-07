const functions = require('firebase-functions');
const express = require("express")
const cors = require("cors")
const stripe= require("stripe")("sk_test_51HkC7nIEnGdFLMkXuIyNXX24CZLHqEbtue3lKte6b0TduTFzEdazV4Vrb0AsSLD7fji6odLDPU5cWyftJtNHW2Nr000knYk5dX")

//API 
//App Config 
const app=express()

// Midleware
app.use(cors({origin:true}))
app.use(express.json())
//Api routes
app.get('/',(req,res)=>res.status(200).send('helloo'))
app.post('/payments/create',async(req,res)=>{
    const total = req.query.total;

    console.log("payment received : " +total)
    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })
    //Ok -- created
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})
//listen command

exports.api=functions.https.onRequest(app)