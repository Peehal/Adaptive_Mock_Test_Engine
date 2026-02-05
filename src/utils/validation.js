import validator from "validator";

export const validateSignUp = ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    throw new Error("Enter valid credentials");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Enter valid email ID");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter valid password");
  }

  if (role !== "student" && role !== "faculty") {
    throw new Error("Please enter valid role");
  }
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

