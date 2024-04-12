import { z } from "zod";

enum Role {
  STUDENT = "Student",
  LECTURER = "Lecturer",
  EMPLOYEE = "Employee",
}
export const formSchema = z.object({
  first_name: z.string().min(3).max(50),
  last_name: z.string().min(3).max(50),
  username: z.string().min(5, "This message is fun").max(15),
  role: z.nativeEnum(Role),
  phone_number: z.number().min(9).max(10),
  verfication_code: z.number().min(6).max(6),
  password: z.string().min(8).max(20),
});
