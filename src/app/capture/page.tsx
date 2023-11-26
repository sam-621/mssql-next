'use client'

import { PageLayout } from '@/components/layout'
import { Button, Input, RadioButton, Select, Table } from '@/components/theme'
import { Family } from '@/libs/types'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { getFamilies } from '../consult/actions'

export default function CapturePage() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const [families, setFamilies] = useState<Family[]>([])
  const [selectedFamily, setSelectedFamily] = useState<string>()

  const [errors, setErrors] = useState({ name: '', description: '', price: '', family: '' })

  useEffect(() => {
    ;(async () => {
      const families = await getFamilies()

      setFamilies(families)
    })()
  }, [])

  const cleanupForm = () => {
    setId('')
    setName('')
    setDescription('')
    setPrice('')
    setSelectedFamily('')
  }

  const create = (e: FormEvent) => {
    e.preventDefault()
    setErrors({ name: '', description: '', price: '', family: '' })

    if (!name || !description || !price || !selectedFamily) {
      setErrors({
        name: !name ? 'El nombre es requerido' : '',
        description: !description ? 'La descripción es requerida' : '',
        price: !price ? 'El precio es requerido' : '',
        family: !selectedFamily ? 'La familia es requerida' : '',
      })
      return
    }
  }

  return (
    <PageLayout>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-4 items-center w-full'>
          <Link href={'/login'}>
            <MoveLeftIcon />
          </Link>
          <h1 className='text-2xl font-semibold'>Capturar</h1>
        </div>
        <form onSubmit={create} className='flex flex-col gap-8'>
          <div className='flex justify-between w-full'>
            <div className='flex gap-4'>
              <RadioButton defaultChecked id='default' name='default' label='Nuevo' />
              <RadioButton id='checked' name='default' label='Modificar' />
            </div>
            <div className='flex gap-4'>
              <Button type='button' onClick={cleanupForm} variant='secondary'>
                Limpiar
              </Button>
              <Button type='submit'>Grabar</Button>
            </div>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <Input
              disabled
              className='max-w-[124px]'
              label='Clave'
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
            <Input
              value={name}
              label='Nombre'
              onChange={(e) => setName(e.target.value)}
              errorMessage={errors.name}
            />
            <Input
              value={description}
              label='Descripción'
              onChange={(e) => setDescription(e.target.value)}
              errorMessage={errors.description}
            />
            <Input
              value={price}
              label='Precio'
              onChange={(e) => setPrice(e.target.value)}
              errorMessage={errors.price}
            />
            <Select
              value={selectedFamily}
              label='Familias'
              placeholder='Seleccione una familia'
              options={families.map((f) => ({ label: f.name, value: f.id }))}
              onChange={(val) => setSelectedFamily(val as string)}
              errorMessage={errors.family}
            />
          </div>
        </form>
        <div>
          <Table articles={[]} />
        </div>
      </div>
    </PageLayout>
  )
}
