import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                success: false,
                message:"User with this email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        
        return res.status(200).json({
            success:true,
            message:`Account with ${email} created successfully`
        })
    } catch (error) {
        console.log("registering error",error);
        return res.status(500).json({
            success: false,
            message:"Error in registering user"
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          });
        }
        const user = await User.findOne({email});
         if (!user) {
           return res.status(400).json({
             success: false,
             message: "user with this email doesn't exists",
           });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(400).json({
            success: false,
            message: "Password doesn't matched",
          });
        }

        generateToken(res, user, `Welcome back ${user.name}`);


    } catch (error) {
        console.log("login error",error);
        return res.status(500).json({
            success: false,
            message:"Failed to login"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success:true
        })
    } catch (error) {
         console.log("logout error", error);
         return res.status(500).json({
           success: false,
           message: "Failed to logout",
         });
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message:"Profile not found"
            })
        }
        return res.status(200).json({
            success: true,
            user,
            message:"User profile found"
        })
    } catch (error) {
        console.log("loading user error", error);
        return res.status(500).json({
          success: false,
          message: "Failed to load user",
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        //extract public of of old image from the url 
         if (user.photoUrl) {
           const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
           deleteMediaFromCloudinary(publicId);
        }
        //upload new pic
        const cloudResponse = await uploadMedia(profilePhoto.path);//will give a url
        const photoUrl = cloudResponse.secure_url;
        const updatedData = { name, photoUrl };
         const updatedUser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password")
         return res.status(200).json({
           success: true,
           user: updatedUser,
           message: "Profile updated successfully.",
         });
    } catch (error) {
        console.log("update profile error", error);
        return res.status(500).json({
          success: false,
          message: "Failed to update profile",
        });
    }
}

export const googleAuth = async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      user = await User.create({
        name,
        email,
        photoUrl: picture,
        googleId,
        password: hashedPassword,
      });
    }

    // Generate token using the utility function
    return generateToken(res, user, "Google login successful");
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate with Google",
    });
  }
};

