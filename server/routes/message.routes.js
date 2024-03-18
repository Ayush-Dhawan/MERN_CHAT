import express from 'express';
import protectRoutev3 from '../middleware/protectRoutesv3.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketID, io } from '../socket/socket.js';


const router = express.Router();

router.get("/:id", protectRoutev3 ,getMessages);
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

        // await conversation.save(); //add them to the db
        // await newMessage.save();

        //faster as runs both saves in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //insert sockets
        const receiverSocketID = getReceiverSocketID(receiverID);
        if(receiverSocketID){
            io.to(receiverSocketID).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage)
        
    } catch (error) {
        res.status(500).json({error: "interna server error"})
        console.log(error.message)
    }
}

async function getMessages(req, res){
    try {
        const {id: userToChatWithID} = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderID, userToChatWithID]}
        }).populate("messages") //instead of just returning message ids it will return an object which will also contain the actual messages

        if(!conversation) return res.status(201).json([]);

        res.status(200).json(conversation?.messages)
    } catch (error) {
        res.status(500).json({error: "interna server error"})
        console.log("in get messages controller",error.message)
    }
}

