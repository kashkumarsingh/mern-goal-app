import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    //Check if the token cookies exists
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "Unautherized, no token" });
    }

    try {
      //Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      /*{"userId": "1234567890","iat": 1662560400,"exp": 1662564000 }*/

      // Find the user by the decoded user ID
      const user = await userModel.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ error: "Unautherized, no such user" });
      }
      // Attach the user object to the request
      req.user = user;

      next();
    } catch (error) {
      // Handle invalid tokens
      console.error(error);
      return res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default protect;
