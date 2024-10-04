import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/axios';
import { APIError } from '@/types/APIError';

const signUpForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  role: z.enum(['ADMIN', 'WORKER']),
  position: z.string(),
  birthdate: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();
  const navigate = useNavigate();

  function handleSignUp(data: SignUpForm) {
    const { name, email, password, role, position, birthdate } = data;

    api.post('users', {
      name,
      email,
      password,
      role,
      position,
      birthdate,
      isActive: true,
    })
      .then(() => {
        toast.success('Cadastro realizado com sucesso!');
        navigate('/profile');
      })
      .catch((error: AxiosError) => {
        const APIError = error.response?.data as APIError;
        toast.error(APIError.message);
      });
  }

  return (
    <div className='container border border-danger rounded p-4'>
      <div className='mb-4'>
        <h3 className='fs-5 text-nowrap'>
          Cadastro de novo colaborador
        </h3>
      </div>

      <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
        <div className='mb-3'>
          <label htmlFor='name'>Nome</label>
          <input type='text' id='name' className='form-control' {...register('name')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='email'>E-mail</label>
          <input type='email' id='email' className='form-control' {...register('email')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='password_hash'>Senha</label>
          <input type='password' id='password_hash' className='form-control' {...register('password')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='role'>Função</label>
          <select id='role' className='form-control' {...register('role')}>
            <option value='ADMIN'>Administrador</option>
            <option value='WORKER'>Colaborador</option>
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor='position'>Cargo</label>
          <input type='text' id='position' className='form-control' {...register('position')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='birthdate'>Data de Nascimento</label>
          <input type='date' id='birthdate' className='form-control' {...register('birthdate')} />
        </div>

        <div>
          <button className="btn btn-primary" disabled={isSubmitting} type='submit'>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
