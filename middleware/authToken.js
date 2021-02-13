const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken")
require('dotenv').config()

function  authToken(req,res,next){
	const token = req.headers['authorization']
	if (token == null) return res.status(401).json({message: 'authorization token error'})

	jwt.verify(token,process.env.EMAIL_SECRET,(err,user) => {
		if(err) return res.status(403).json({message: 'verify error'})
		req.user = user
	next()
	})
}