import { api } from '@/lib/axios'

interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  position: string;
  birthdate: string;
  is_active: boolean;
  inactive_at: Date | null;
  created_at: Date;
}

export async function getProfile(token: string | null) {
  if (!token) {
    throw new Error('Token is required');
  }

  const response = await api.get<GetProfileResponse>("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
}