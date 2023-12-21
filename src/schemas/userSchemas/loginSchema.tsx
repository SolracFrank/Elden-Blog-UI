import { ZodType, z } from "zod";
import { loginProps } from "../../interfaces/authInterfaces";

const loginSchema: ZodType<loginProps> = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export default loginSchema;
