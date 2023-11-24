import { Card } from '@/components/card'
import { Input } from '@/components/input'

export const LoginForm = () => {
  return (
    <Card className=' w-full'>
      <form className='flex flex-col gap-5'>
        <div>
          <h2 className='text-2xl font-semibold'>Conectividad - Articulos</h2>
        </div>
        <div className=''>
          <Input defaultValue='localhost' label='Servidor' id='server' />
        </div>
        <div className=''>
          <Input label='Base de datos' id='db' defaultValue='ventas' />
        </div>
        <div className=''>
          <Input label='Username' id='username' defaultValue={'sa'} />
        </div>
        <div className=''>
          <Input label='password' id='password' defaultValue={'2Wsxzaq1'} />
        </div>
        <div className='w-full text-right'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Entrar
          </button>
        </div>
      </form>
    </Card>
  )
}
