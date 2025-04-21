import jwt from "jsonwebtoken"

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
      })
      .json({
        success: true,
        message,
        user
      })
}