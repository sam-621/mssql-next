'use client'

import { PageLayout } from '@/components/layout'
import { Button, ErrorMessage, Input, Select, Table } from '@/components/theme'
import { MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getArticlesFiltered, getFamilies } from './actions'
import { Article, Family } from '@/libs/types'

export default function ConsultPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [families, setFamilies] = useState<Family[]>([])
  const [selectedFamily, setSelectedFamily] = useState<string>()

  useEffect(() => {
    ;(async () => {
      const families = await getFamilies()

      setFamilies(families)
    })()
  }, [])

  const search = async () => {
    setIsLoading(true)

    const articles = await getArticlesFiltered(
      id,
      name,
      description,
      price,
      Number(selectedFamily) ? selectedFamily ?? '' : ''
    )

    setArticles(articles)
    setIsLoading(false)
  }

  return (
    <PageLayout>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-4 items-center w-full'>
          <Link href={'/login'}>
            <MoveLeftIcon />
          </Link>
          <h1 className='text-2xl font-semibold'>Consultar</h1>
        </div>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4 w-full'>
            <Input
              className='max-w-[124px]'
              label='Clave'
              onChange={(e) => setId(e.target.value)}
            />
            <Input label='Nombre' onChange={(e) => setName(e.target.value)} />
            <Input label='Descripción' onChange={(e) => setDescription(e.target.value)} />
            <Input label='Precio' onChange={(e) => setPrice(e.target.value)} />
            <Select
              label='Familias'
              placeholder='Seleccione una familia'
              options={families.map((f) => ({ label: f.name, value: f.id }))}
              onChange={(val) => setSelectedFamily(val as string)}
            />
          </div>
          <div className='flex justify-between w-full items-center'>
            <ErrorMessage message='Error message' />
            <Button disabled={isLoading} onClick={search}>
              Buscar
            </Button>
          </div>
        </form>
        <div>
          <Table articles={articles} />
        </div>
      </div>
    </PageLayout>
  )
}
