import { PageLayout } from '@/components/layout'
import { Button, Input, RadioButton, Table } from '@/components/theme'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default async function CapturePage() {
  return (
    <PageLayout className='flex-col items-center justify-center gap-8'>
      <div className='flex gap-4 items-center w-full'>
        <Link href={'/login'}>
          <MoveLeftIcon />
        </Link>
        <h1 className='text-2xl font-semibold'>Capturar</h1>
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex gap-4'>
          <RadioButton defaultChecked id='default' name='default' label='Nuevo' />
          <RadioButton id='checked' name='default' label='Modificar' />
        </div>
        <div className='flex gap-4'>
          <Button variant='secondary'>Limpiar</Button>
          <Button>Grabar</Button>
        </div>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <Input disabled className='max-w-[124px]' label='Clave' />
        <Input label='Nombre' />
        <Input label='Telefono' />
      </div>
      <div>
        <Table />
      </div>
    </PageLayout>
  )
}
