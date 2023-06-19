import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const payload = { userId: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expiration time
  });

  // Set the token as a cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Set to true if your application is served over HTTPS
    sameSite: "strict", // Provides some protection against cross-site request forgery (CSRF) attacks
    maxAge: 3600000, // Token expiration time in milliseconds
    path: "/", // Specify the path where the cookie is valid
  });
};

export default generateToken;







/*
const cookie = require('cookie');

const generateToken = (res, token) => {
  // Generate the HTTP-only cookie
  const secureCookie = process.env.NODE_ENV === 'production';

  // Set the token as a secure HTTP-only cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'strict',
      path: '/',
      maxAge: 3600, // Token expiration time in seconds
    })
  );
};
*/
