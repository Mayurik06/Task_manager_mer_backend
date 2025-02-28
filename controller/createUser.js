import bcrypt from "bcryptjs";
import User from "../model/user.js";
import req from "express/lib/request.js";
import Task from "../model/Task.js";

export const createUser = async (req, res) => {

  const { name, aliasEmail, email, password, role,position } = req.body;

  try {
    if (!name || !aliasEmail || !email || !role || !position) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all details." });
    }
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: "Email already registered." });
    // }
    const existingAliasEmail = await User.findOne({ aliasEmail });

    if (existingAliasEmail) {
      return res
        .status(400)
        .json({ message: "AliasEmail already registered." });
    }
    const newUserData = {
      name,
      aliasEmail,
      email,
      position,
      role: role || "user",
    };


    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      newUserData.password = hashedPassword;
    }


    const newUser = new User(newUserData);
    await newUser.save();

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",error:error.message });
  }
};


export const getUsers=async(req,res)=>{
try {
  const users=await User.find();
  return res.status(200).json({message:"Users fetched successfully",success:true, users});
} catch (error) {
  return res.status(500).json({message:"Error fetching users", error:error.message});
  
}
}


export const deleteUsers=async(req,res)=>{
  const {id}=req.params;

  try {
    const user=await User.findById(id);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    await Task.deleteMany({assignedTo:id});
    await User.findByIdAndDelete(id);
    return res.status(200).json({message:"User deleted successfully"})
  } catch (error) {
      return res.status(500).json({message:"Error deleting users", error:error.message});
  }
}

export const getUserById=async(req,res)=>{
  const {id}=req.params;

try {
  let user=await User.findOne({_id:id})

  if(!user){
    return res.status(404).json({message:"User not found"});
  }
  return res.status(200).json({message:"User Found successfully",user})
} catch (error) {
  return res.status(500).json({message:"User not found", error:error.message});
}
}


export const updateUser=async(req,res)=>{
  const { name, aliasEmail, email, role,position } = req.body;
const {id}=req.params;
try {
  if (!name || !aliasEmail || !email || !role || !position) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all details." });
  }
  const existingAliasEmail = await User.findOne({
    aliasEmail,
    _id: { $ne: id },
  });


  if (existingAliasEmail) {
    return res
      .status(400)
      .json({ message: "AliasEmail already registered." });
  }
 
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      aliasEmail,
      email,
      position,
      role: role,
    },
    { new: true, runValidators: true } 
  );
  if (!updatedUser) {
    return res
      .status(404)
      .json({ success: false, message: "User not found." });
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully.",
    user: updatedUser,
  });

} catch (error) {
    return res.status(500).json({message:"Error Updating User", error:error.message});
}
}