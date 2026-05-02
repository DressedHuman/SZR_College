const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  published_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

export interface Teacher {
  id: number;
  user_id: number;
  department: string;
  designation: string;
  user: User;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image_url?: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    const message = typeof error.detail === 'string' 
      ? error.detail 
      : JSON.stringify(error.detail) || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export async function login(email: string, password: string): Promise<Token> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  return handleResponse<Token>(res);
}

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse<User>(res);
}

export async function getNotices(): Promise<Notice[]> {
  const res = await fetch(`${BASE_URL}/notices/`, { 
    cache: "no-store"
  });
  return handleResponse<Notice[]>(res);
}

export async function getTeachers(): Promise<Teacher[]> {
  const res = await fetch(`${BASE_URL}/teachers/`, { 
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  return handleResponse<Teacher[]>(res);
}

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/events/`, { 
    next: { revalidate: 60 } 
  });
  return handleResponse<Event[]>(res);
}

export interface StudentProfile {
  id: number;
  user_id: number;
  roll: string;
  registration_no: string;
  department: string;
  user?: User;
}

export interface Result {
  id: number;
  student_id: number;
  subject: string;
  marks: number;
  exam_type: string;
}

export async function getMyStudentProfile(token: string): Promise<StudentProfile> {
  const res = await fetch(`${BASE_URL}/students/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return handleResponse<StudentProfile>(res);
}

export async function getMyResults(token: string): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return handleResponse<Result[]>(res);
}

export interface AdmissionData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  previous_school: string;
  marks_obtained: number;
}

export async function applyAdmission(data: AdmissionData) {
  const res = await fetch(`${BASE_URL}/admissions/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// Admin CRUD helpers

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export async function adminGetStudents(token: string): Promise<StudentProfile[]> {
  const res = await fetch(`${BASE_URL}/students/?limit=100`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return handleResponse<StudentProfile[]>(res);
}

export async function adminCreateNotice(token: string, data: { title: string; content: string; category: string }) {
  const res = await fetch(`${BASE_URL}/notices/`, {
    method: "POST", headers: authHeaders(token), body: JSON.stringify(data),
  });
  return handleResponse<Notice>(res);
}

export async function adminUpdateNotice(token: string, id: number, data: { title: string; content: string; category: string }) {
  const res = await fetch(`${BASE_URL}/notices/${id}`, {
    method: "PUT", headers: authHeaders(token), body: JSON.stringify(data),
  });
  return handleResponse<Notice>(res);
}

export async function adminDeleteNotice(token: string, id: number) {
  const res = await fetch(`${BASE_URL}/notices/${id}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ message: string }>(res);
}

export async function adminDeleteStudent(token: string, id: number) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ message: string }>(res);
}

export async function adminCreateStudent(token: string, data: any) {
  const res = await fetch(`${BASE_URL}/students/full`, {
    method: "POST", headers: authHeaders(token), body: JSON.stringify(data),
  });
  return handleResponse<StudentProfile>(res);
}

export async function adminUpdateStudent(token: string, id: number, data: any) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT", headers: authHeaders(token), body: JSON.stringify(data),
  });
  return handleResponse<StudentProfile>(res);
}

export async function adminDeleteTeacher(token: string, id: number) {
  const res = await fetch(`${BASE_URL}/teachers/${id}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ message: string }>(res);
}

export async function adminCreateResult(token: string, data: { student_id: number; subject: string; marks: number; exam_type: string }) {
  const res = await fetch(`${BASE_URL}/results/`, {
    method: "POST", headers: authHeaders(token), body: JSON.stringify(data),
  });
  return handleResponse<Result>(res);
}

export async function adminDeleteResult(token: string, id: number) {
  const res = await fetch(`${BASE_URL}/results/${id}`, {
    method: "DELETE", headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse<{ message: string }>(res);
}

export async function adminGetResults(token: string, roll: string): Promise<Result[]> {
  const res = await fetch(`${BASE_URL}/results/?roll=${roll}&limit=100`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return handleResponse<Result[]>(res);
}
