import { getProfile } from '@/api/get-profile';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function Profile() {
  const token = sessionStorage.getItem('authToken');

  const { data: profile, error, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(token),
    enabled: !!token
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error('Erro ao carregar os dados do usuário');
    return <div>Erro ao carregar os dados</div>;
  }
  console.log(profile?.id)
  return (
    <div className='container border border-danger rounded p-4' style={{ maxWidth: '600px', width: '100%' }}>
      <div className='mb-4'>
        <h3 className='fs-5 text-nowrap'>
          Bem-vindo, {profile?.name}
        </h3>
      </div>

      <div className='mb-3'>
        <p><strong>Email:</strong> {profile?.email}</p>
      </div>

      <div className='mb-3'>
        <p><strong>Cargo:</strong> {profile?.position}</p>
      </div>

      <div className='mb-3'>
        <p><strong>Data de Nascimento:</strong> {profile?.birthdate}</p>
      </div>

      <div className='button-group row row-cols-3 align-items-center'>
        <Link to='/update-profile'>
          <button className="btn  btn-danger">
            Atualizar Dados
          </button>
        </Link>

        {profile?.role === 'ADMIN' && (
          <Link to='/register'>
            <button className="btn  btn-danger">
              Cadastrar novo funcionário
            </button>
          </Link>
        )}

        <Link 
          to={`/registrar-ponto/${profile?.id}`}
        >
          <button className="btn  btn-danger">
            Registrar ponto eletrônico
          </button>
        </Link>
      </div>
    </div>
  );
}
