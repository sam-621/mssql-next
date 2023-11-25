import { PageLayout } from '@/components/layout'
import { Button, ErrorMessage, Input, Table } from '@/components/theme'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function ConsultPage() {
  return (
    <PageLayout className='flex-col items-center justify-center gap-8'>
      <div className='flex gap-4 items-center w-full'>
        <Link href={'/login'}>
          <MoveLeftIcon />
        </Link>
        <h1 className='text-2xl font-semibold'>Consultar</h1>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <Input disabled className='max-w-[124px]' label='Clave' />
        <Input label='Nombre' />
        <Input label='Telefono' />
      </div>
      <div className='flex justify-between w-full items-center'>
        <ErrorMessage message='Error message' />
        <Button>Buscar</Button>
      </div>
      <div>
        <Table />
      </div>
    </PageLayout>
  )
}
