import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import About from "../models/about.model.js";

//update uset details
export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).send({
      success: false,
      message: "You can only update your own account please login again!",
    });
  }
  //   console.log(req.body.phone);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(201).send({
      success: true,
      message: "User Details Updated Successfully",
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).send({
        success: true,
        message: "email already taken please login!",
      });
    }
  }
};

//update user profile photo
export const updateProfilePhoto = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account profile photo please login again!",
      });
    }

    const updatedProfilePhoto = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const validUser = await User.findById(req.params.id);
    const { password: pass, ...rest } = validUser._doc;

    if (updatedProfilePhoto) {
      return res.status(201).send({
        success: true,
        message: "Profile photo updated",
        user: rest,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// update user password
export const updateUserPassword = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message:
          "You can only update your own account password please login again!",
      });
    }

    const validUser = await User.findById(req.params.id);

    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;

    const validPassword = bcryptjs.compareSync(oldPassword, validUser.password);
    if (!validPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const updatedHashedPassword = bcryptjs.hashSync(newPassword, 10);
    const updatedPassword = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: updatedHashedPassword,
        },
      },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//delete user
export const deleteUserAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res.status(401).send({
      success: false,
      message: "You can only delete your account!",
    });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token"); //clear cookie before sending json
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};

//get all users admin
export const getAllUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const users = await User.find({
      user_role: 0,
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    });
    if (users && users.length > 0) {
      res.send(users);
    } else {
      res.status(200).send({
        success: false,
        message: "No Users Yet!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete user admin
export const deleteUserAccountAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req?.params?.id);
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};


// Promote a user to admin
export const promoteToAdmin = async (req, res) => {
  try {
    console.log("i am communication");
    // const user = await User.findById(req.user.id);
    // // Check if the requester is an admin
    // if (!user.user_role) {
    //   return res.status(403).send({
    //     success: false,
    //     message: "Unauthorized: Only admins can promote users to admin",
    //   });
    // }

    // Find the user by ID
    const userToUpdate = await User.findById(req.params.id);
    // console.log(userToUpdate);
    if (!userToUpdate) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is already an admin
    if (userToUpdate.user_role === 1) {
      return res.status(400).send({
        success: false,
        message: "User is already an admin",
      });
    }

    // Update the user role to admin
    userToUpdate.user_role = 1; // Assuming 1 represents admin role, adjust as needed
    await userToUpdate.save();

    res.status(200).send({
      success: true,
      message: "User promoted to admin",
      user: userToUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Update About page content
export const updateAboutContent = async (req, res) => {
  try {
    // Check if the user is authorized to update the About page content
    // You might want to add more stringent authorization logic here
    // if (!req.user.isAdmin) {
    //   return res.status(403).send({
    //     success: false,
    //     message: "Unauthorized: Only admins can update the About page content",
    //   });
    // }

    const updatedAbout = await About.findOneAndUpdate(
      {},
      { $set: { content: req.body.content } },
      { new: true, upsert: true }
    );

    res.status(200).send({
      success: true,
      message: "About page content updated successfully",
      about: updatedAbout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Controller function to get the About page content
export const getAboutContent = async (req, res) => {
  try {
    // Find the About document in the database
    const about = await About.findOne();

    if (!about) {
      return res.status(404).send({
        success: false,
        message: "About page content not found",
      });
    }

    // Send the About page content as a response
    res.status(200).send({
      success: true,
      about: about.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};