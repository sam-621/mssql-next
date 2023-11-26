'use client'

import { PageLayout } from '@/components/layout'
import { Button, Input, RadioButton, Select, Table } from '@/components/theme'
import { Article, Family } from '@/libs/types'
import { Loader2Icon, MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { getArticlesFiltered, getFamilies } from '../consult/actions'
import { ArticleRepository } from '@/libs/repositories'
import { getArticleById } from './actions'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

enum FormState {
  CREATE,
  UPDATE,
}

export default function CapturePage() {
  // form fields
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  // families for select input
  const [families, setFamilies] = useState<Family[]>([])
  const [selectedFamily, setSelectedFamily] = useState<string>()

  // from fields errors
  const [errors, setErrors] = useState({ name: '', description: '', price: '', family: '' })

  // manage is creating or updating
  const [formState, setFormState] = useState(FormState.CREATE)

  // searching states
  const [isSearching, setIsSearching] = useState(false)

  // articles table state
  const [articles, setArticles] = useState<Article[]>([])

  // Fetch families
  useEffect(() => {
    ;(async () => {
      const families = await getFamilies()

      setFamilies(families)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const articles = await getArticlesFiltered('', '', '', '', '')

      setArticles(articles)
    })()
  }, [])

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (formState === FormState.UPDATE) {
      setIsSearching(true)

      if (!term) {
        setName('')
        setDescription('')
        setPrice('')
        setSelectedFamily('')

        setIsSearching(false)
        return
      }

      const article = await getArticleById(id)

      if (!article) {
        setName('')
        setDescription('')
        setPrice('')
        setSelectedFamily('')

        toast.error('El artículo no existe')
        setIsSearching(false)
        return
      }

      setId(article.id)
      setName(article.name)
      setDescription(article.description)
      setPrice(article.price)
      setSelectedFamily(article.famId)

      setIsSearching(false)
    }
  }, 300)

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
              <RadioButton
                onChange={() => setFormState(FormState.CREATE)}
                defaultChecked
                name='create'
                value={FormState.CREATE}
                checked={formState === FormState.CREATE}
                label='Nuevo'
              />
              <RadioButton
                onChange={() => setFormState(FormState.UPDATE)}
                name='update'
                value={FormState.UPDATE}
                label='Modificar'
                checked={formState === FormState.UPDATE}
              />
            </div>
            <div className='flex gap-4'>
              <Button type='button' onClick={cleanupForm} variant='secondary'>
                Limpiar
              </Button>
              <Button type='submit'>Grabar</Button>
            </div>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex items-end gap-3'>
              <Input
                disabled={formState === FormState.CREATE}
                className='max-w-[124px]'
                label='Clave'
                onChange={async (e) => {
                  const newId = e.target.value

                  setId(newId)
                  handleSearch(newId)
                }}
                value={id}
              />
              {isSearching && <Loader2Icon size={24} className='mb-[6px] animate-spin' />}
            </div>
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
          <Table articles={articles} />
        </div>
      </div>
    </PageLayout>
  )
}
