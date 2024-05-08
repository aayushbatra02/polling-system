import { checkEmailRegex } from "@/utils/checkEmailRegex";

export const authenticateEmail = (email) => {
  if (!email) {
    return "Email Required";
  } else if (!checkEmailRegex(email)) {
    return "Invalid Email";
  } else {
    return "";
  }

}