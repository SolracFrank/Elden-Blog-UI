import { ZodType, z } from "zod";
import { registerProps } from "../../interfaces/authInterfaces";

const registerSchema: ZodType<registerProps> = z
  .object({
    email: z.string().email({ message: "Email is not valid" }),
    username: z
      .string()
      .min(1, { message: "Username cannot be empty" })
      .max(50, { message: "Max Username length is 50" }),
      birthday: z.date().refine(
      (date) => {
        return date <= new Date();
      },
      { message: "Invalid Date" }
    ),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[!@#$_%^&*]).{6,15}$/, {
      message:
        "Password must be 6-15 characters length and must have at least one uppercase letter and one special character",
    }),
    repeatpassword: z.string().min(1, { message: "Field cannot be empty" }),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: "Passwords don't match",
    path: ["repeatpassword"],
  });

export default registerSchema;
