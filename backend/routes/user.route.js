import express from "express";
import {
  deleteUserAccount,
  deleteUserAccountAdmin,
  getAllUsers,
  updateProfilePhoto,
  updateUser,
  updateUserPassword,
  promoteToAdmin,
  updateAboutContent,
  getAboutContent,
} from "../controllers/user.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//user auth
router.get("/user-auth", requireSignIn, (req, res) => {
  return res.status(200).send({ check: true });
});

//admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ check: true });
});

//update user details
router.post("/update/:id", requireSignIn, updateUser);

//update user profile photo
router.post("/update-profile-photo/:id", requireSignIn, updateProfilePhoto);

//update user password
router.post("/update-password/:id", requireSignIn, updateUserPassword);

//delete user account
router.delete("/delete/:id", requireSignIn, deleteUserAccount);

//get all users
router.get("/getAllUsers", requireSignIn, isAdmin, getAllUsers);

//admin delete user accounts
router.delete(
  "/delete-user/:id",
  requireSignIn,
  isAdmin,
  deleteUserAccountAdmin
);

//permote user 
router.put("/promote/:id", requireSignIn, isAdmin, promoteToAdmin);

router.put("/update-about-content", requireSignIn, isAdmin, updateAboutContent);
router.get("/about-content", requireSignIn, isAdmin, getAboutContent);

export default router;
