import sendEmail from "../../lib/sendEmail.js";
import User from "../../model/user.js";

export const login = async (req, res) => {

  const { aliasEmail } = req.body;
  if (!aliasEmail) {
    return res.status(400).json({ message: "Alias email is required" });
  }
  try {
    const user = await User.findOne({ aliasEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password) {
      return res.status(200).json({
        message: "redirect", id:user._id
      });
    }
    const baseUrl = process.env.FRONTEND_URL.replace(/\/$/, "");
    const setPasswordLink = `${baseUrl}/set-password/${user._id}`;
    await sendEmail({
      to: user.email,
      subject: "Set Your Password",
      template: "setPasswordEmail",
      variable: { username: user.name, setPasswordLink },
    });
    return res.status(200).json({ message: "reset" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error:error.message });
  }
};


export const logout=async(req,res)=>{
  try {
    res.clearCookie('token', {
      httpOnly: true, // Secure the cookie
      sameSite: 'strict', // Prevent CSRF attacks
      secure: process.env.NODE_ENV === 'production', // Secure flag for production
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error while logout',error:error.message });
  }
}