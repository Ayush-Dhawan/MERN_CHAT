import express from 'express';
import protectRoutev3 from '../middleware/protectRoutesv3.js';
import User from '../models/user.model.js';
import Conversation from '../models/conversation.model.js';

const router = express.Router();



export const getUsersForSidebar = async (req, res) => {
    // console.log("func called")
	try {
		// const user = localStorage.getItem("chat-user");
        // let user_id;
        // if(user) user_id = JSON.parse(user);

        const user_id = req.user._id;

        // console.log("user id in server: ", user_id)

		const filteredUsers = await User.find({ _id: { $ne: user_id } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error in userRoute" });
	}
};

// async function getUsersForSidebar(req, res){
//     try {
//         const loggedInUser = req.user;
//         const user_id = req.user._id;

//         // const allUsers = await User.find({_id: {$ne: loggedInUser}}); //returns all users not equal to the logged in one
//         // if(!allUsers) return res.status(500).json({error: "Internal server error: unable to fetch all users in user route"})
//         // res.status(200).json(allUsers)

//         const allConvos = await Conversation.find({participants: { $in: [loggedInUser] }})
//         if(!allConvos) return res.status(500).json({error: "Internal server error: unable to fetch all convos in user route"})

//             // Array to store other user IDs
//     const otherUserIds = [];

//     // Iterate over each conversation
//     allConvos.forEach(conversation => {
//         // Ensure there are at least two participants in the conversation
//         if (conversation.participants.length >= 2) {
//             // Fetch the second element (index 1) from the `participants` array
//             const secondUserId = conversation.participants[1];

//             // Add the second user ID to the array
//             otherUserIds.push(secondUserId);
//         }
//     });

//     if(!otherUserIds) return res.status(404).json({error: "unable to find users youve conversed with"})
//     return res.status(200).json(otherUserIds)

//     // console.log("Other User IDs:", otherUserIds);
        
//     } catch (error) {
//         console.log("Error in get users for sidebar: ", error.message);
//         res.status(500).json("Internal server error")
//     }
// }



router.get("/", protectRoutev3, getUsersForSidebar);

export default router;



