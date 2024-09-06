import { uploadPhoto, createUser } from "./utils";

export default function handleProfileSignup() {
  const body = uploadPhoto().then((res) => res.body);
  const user = createUser().then((res) => res);

  return `${body} ${user.firstName} ${user.lastName}`;
}
