import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { APIError } from '@/types/APIError';

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
})

type signInForm = z.infer<typeof signInForm>
export function SignIn() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<signInForm>();
  const navigate = useNavigate();
  
  function handleSignIn(data: signInForm) {
    const { email, password } = data;

    api.post('sessions', {
      email,
      password,
    })
      .then(response => {
        const { token } = response.data;
        sessionStorage.setItem('authToken', token);
        toast.success('Login realizado com sucesso!');
        navigate('/profile');
      })
      .catch((error: AxiosError) => {
        const APIError = error.response?.data as APIError
        toast.error(APIError.message);
      });
  }

  return (
    <div className='container border border-danger rounded p-4'>
      <div className='mb-4'>
        <h3 className='fs-5 text-nowrap'>
          Bem-vindo ao Portal do Colaborador
        </h3>
      </div>

      <form onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
        <div className='mb-3'>
          <label htmlFor='email'>Insira seu e-mail</label>
          <input type='email' id='email' className='form-control' {...register('email')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='password'>Insira sua senha</label>
          <input type='password' id='password' className='form-control' {...register('password')} />
        </div>

        <div>
          <button className="btn btn-primary" disabled={isSubmitting} type='submit'>
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}
