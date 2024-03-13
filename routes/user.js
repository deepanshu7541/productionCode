const express = require("express");
const router = express.Router();
const User = require('../models/User');


const { login, register, dashboard, getAllUsers, verify } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
// router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/dashboard").get(authMiddleware, dashboard);
// router.route("/dashboard").get(profile);
router.route("/certificates/:cid").get(verify);
// router.get('/dashboard', authenticateToken, async (req, res) => {
//     try {
//       const userId = req.user.userId; // Assuming your decoded token has userId
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         profileURL: user.profileURL,
//         aboutUs: user.aboutUs,
//         noOfProjects: user.noOfProjects,
//         skills: user.skills,
//         socialProfiles: user.socialProfiles,
//         certificates: user.certificates,
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  

router.route("/users").get(getAllUsers);


module.exports = router;