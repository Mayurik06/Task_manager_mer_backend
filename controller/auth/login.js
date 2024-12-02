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
        message: "Password exists, redirecting to Write Password page",
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
    return res.status(200).json({ message: "Email is sent to you email address" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error:error.message });
  }
};
