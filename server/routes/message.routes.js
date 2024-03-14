import express from 'express';
import protectRoutev3 from '../middleware/protectRoutesv3.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';


const router = express.Router();

router.post("/send/:id", protectRoutev3 ,sendMessage); ///protect route is a middle ware...the line means run send message after protecting the route ie performing auth

export default router;

async function sendMessage(req, res){
    try {
        const message = req.body.message;
        const {id: receiverID} = req.params;
        const senderID = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderID, receiverID]} //find a conversation where all the fields (here senderid, receiverid) in bracket exist
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
        }

        const newMessage = await Message.create({
            senderID, receiverID, message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json({message: "new message created"})
        
    } catch (error) {
        res.status(500).json({error: "interna server error"})
        console.log(error.message)
    }
}

