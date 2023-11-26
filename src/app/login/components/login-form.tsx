'use client'

import { authenticate } from '@/app/actions'
import { FormButton } from '@/components/forms'
import { ButtonLink, Card, Input } from '@/components/theme'
import { useFormState } from 'react-dom'

export const LoginForm = () => {
  const [state, action] = useFormState(authenticate, { finished: false, success: false })

  return (
    <Card className='flex flex-col gap-4 w-full h-fit'>
      <form action={action} className='flex flex-col gap-5'>
        <div>
          <h2 className='text-2xl font-semibold'>Conectividad - Articulos</h2>
        </div>
        <div className=''>
          <Input defaultValue='localhost' label='Servidor' name='server' />
        </div>
        <div className=''>
          <Input label='Base de datos' name='db' defaultValue='ventas' />
        </div>
        <div className=''>
          <Input label='Username' name='username' defaultValue={'sa'} />
        </div>
        <div className=''>
          <Input label='password' name='password' defaultValue={'2Wsxzaq1'} />
        </div>
        <div className='w-full text-right'>
          <FormButton>Conectar</FormButton>
        </div>
        {state.finished && !state.success && (
          <div>
            <span className='text-red-500'>{state.error}</span>
          </div>
        )}
      </form>
      {state.finished && state.success && (
        <div className='flex flex-col gap-4 justify-center items-center'>
          <ButtonLink href='/capture' variant='secondary' className='px-16 py-6'>
            Captura
          </ButtonLink>
          <ButtonLink href='/consult' variant='secondary' className='px-16 py-6'>
            Consulta
          </ButtonLink>
        </div>
      )}
    </Card>
  )
}
