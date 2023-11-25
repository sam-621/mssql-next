import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PageLayout } from '@/components/page-layout'
import { RadioButton } from '@/components/radio-button'

export default async function CapturePage() {
  return (
    <PageLayout className='flex-col items-center justify-center gap-8'>
      <div className='flex gap-6'>
        <RadioButton defaultChecked label='Nuevo' />
        <RadioButton label='Modificar' />
        <Button>Limpiar</Button>
        <Button>Grabar</Button>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <Input label='Clave' />
        <Input label='Nombre' />
        <Input label='Telefono' />
      </div>
    </PageLayout>
  )
}
