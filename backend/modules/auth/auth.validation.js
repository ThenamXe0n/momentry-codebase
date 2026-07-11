export const validateRegister = (req, res, next) => {
  const { email, password, username, fullName } = req.body;

  if (!email || !password || !username || !fullName) {
    return res.status(400).json({
      success: false,
      message: "All fields (email, username, password, fullName) are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email/username and password.",
    });
  }

  next();
};
