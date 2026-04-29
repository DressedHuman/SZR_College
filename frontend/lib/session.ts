import { cookies } from "next/headers";
import { getCurrentUser, User } from "./api";
import { TOKEN_KEY } from "./auth";

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;

  if (!token) return null;

  try {
    return await getCurrentUser(token);
  } catch (err) {
    return null;
  }
}
