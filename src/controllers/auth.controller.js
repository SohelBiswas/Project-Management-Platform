import { User } from "../models/user.models";
import { ApiResponse } from "../utils/api-response";
import { ApiError } from "../utils/api-error";
import { asyncHandler, AsyncHandler } from "../utils/async-handler";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendMail,
} from "../utils/mail";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, role } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username, email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists", []);
  }

  const user = await User.create({
    email,
    username,
    password,
    isEmailVerified: False,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: False });

  sendMail;
});
