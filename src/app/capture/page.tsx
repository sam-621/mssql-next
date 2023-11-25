import { PageLayout } from '@/components/layout'
import { Button, Input, RadioButton } from '@/components/theme'

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
