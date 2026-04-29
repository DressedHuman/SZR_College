const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  role: string;
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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getNotices(): Promise<Notice[]> {
  const res = await fetch(`${BASE_URL}/notices/`, { 
    next: { revalidate: 60 } // Cache for 60 seconds
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
