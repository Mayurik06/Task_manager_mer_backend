import User from "../../model/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const setPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { id } = req.params;
  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirm Password feild is required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password should be same " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign(
      { id: user._id,name:user.name, email: user.email, role:user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Set token in HTTP-only cookie (optional for added security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: "Password updated successfully", token, role:user.role });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",error:error.message });
  }
};
