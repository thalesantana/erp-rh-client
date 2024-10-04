import { api } from '@/lib/axios'

interface GetProfileResponse {
  email: string;
  password: string;
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