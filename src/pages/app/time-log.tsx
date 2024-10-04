import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/axios';

// Definindo o esquema para validação do formulário
const createTimeEntryBodySchema = z.object({
  checkIn: z.string().optional(),
  lunchStart: z.string().optional(),
  lunchEnd: z.string().optional(),
  checkOut: z.string().optional(),
});

// Tipos inferidos do esquema
type TimeLogForm = z.infer<typeof createTimeEntryBodySchema>;

// Função para criar o formato de timezone ISO 8601 com a data atual e hora
function combineDateWithTime(time?: string) {
  if (!time) return undefined; // Caso a hora seja opcional

  const currentDate = new Date();
  const [hours, minutes] = time.split(':'); // Separar a hora e minutos

  currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Ajustar a hora
  return currentDate.toISOString(); // Retorna no formato ISO 8601
}

export function TimeLog() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<TimeLogForm>({
    resolver: zodResolver(createTimeEntryBodySchema),
  });

  const navigate = useNavigate();
  const { userId } = useParams(); 

  function handleTimeLog(data: TimeLogForm) {
    const token = sessionStorage.getItem('authToken');

    // Converter as horas para formato ISO 8601 com data e timezone
    const timeLogData = {
      checkIn: combineDateWithTime(data.checkIn),
      lunchStart: combineDateWithTime(data.lunchStart),
      lunchEnd: combineDateWithTime(data.lunchEnd),
      checkOut: combineDateWithTime(data.checkOut),
    };

    // Fazer a requisição à API
    api.post(`/time-entries/user/${userId}/create`, timeLogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('Ponto registrado com sucesso!');
        navigate('/profile');
      })
      .catch(() => {
        toast.error('Erro ao registrar o ponto');
      });
  }

  return (
    <div className='container border border-danger rounded p-4' style={{ maxWidth: '600px', width: '100%' }}>
      <div className='mb-4'>
        <h3 className='fs-5 text-nowrap'>
          Registrar Ponto Eletrônico
        </h3>
      </div>

      <form onSubmit={handleSubmit(handleTimeLog)} className='space-y-4'>
        <div className='mb-3'>
          <label htmlFor='checkIn'>Horário de Entrada</label>
          <input type='time' id='checkIn' className='form-control' {...register('checkIn')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='lunchStart'>Saída para Almoço</label>
          <input type='time' id='lunchStart' className='form-control' {...register('lunchStart')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='lunchEnd'>Volta do Almoço</label>
          <input type='time' id='lunchEnd' className='form-control' {...register('lunchEnd')} />
        </div>

        <div className='mb-3'>
          <label htmlFor='checkOut'>Saída do Trabalho</label>
          <input type='time' id='checkOut' className='form-control' {...register('checkOut')} />
        </div>

        <div>
          <button className="btn btn-primary" disabled={isSubmitting} type='submit'>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
