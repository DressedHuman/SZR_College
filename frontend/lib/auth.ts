import { User } from "./api";

export const TOKEN_KEY = "szr_token";

export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    // Set cookie for 1 hour
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=3600; SameSite=Strict`;
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${TOKEN_KEY}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
  return null;
}

export function removeToken() {
  if (typeof window !== "undefined") {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

export function isAdmin(user: User | null) {
  return user?.role === "admin";
}

export function isTeacher(user: User | null) {
  return user?.role === "teacher";
}

export function isStudent(user: User | null) {
  return user?.role === "student";
}
