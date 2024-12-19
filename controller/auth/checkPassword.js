import User from "../../model/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const checkPassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is missing" });
    }
    const isMatch =await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, name:user.name ,email: user.email, role:user.role }, // Payload
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
    return res.status(200).json({ message: "Login successfull" ,token, role:user.role});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
