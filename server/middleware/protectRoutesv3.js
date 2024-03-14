    import jwt from 'jsonwebtoken'
    import User from '../models/user.model.js';

    const protectRoutev3 = async(req, res, next) =>{
        try {
            const token = req.cookies.jwt;

            if(!token) return res.status(401).json({error: "Unauthorized - No token found-initially"});
            
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded_token) return res.status(401).json({error: "Unauthorized - No token found"});

            const user = await User.findById(decoded_token.userId).select("-password");
            if(!user) return res.status(401).json({error: "Unauthorized - User not found"});

            req.user = user;
            next();

        } catch (error) {
            console.log("error in protectRoute middleware: ", error.message);
            res.status(500).json({error: "error"})
        }
    }

    export default protectRoutev3;