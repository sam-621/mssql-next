'use client'

import { PageLayout } from '@/components/layout'
import { Button, Input, RadioButton, Select, Table } from '@/components/theme'
import { Article, Family } from '@/libs/types'
import { Loader2Icon, MoveLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import {
  checkPermission,
  createArticle,
  getArticleById,
  getArticlesFiltered,
  getFamilies,
  removeArticle,
  updateArticle,
} from '../actions'

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

  // mutation states
  const [refetch, setRefetch] = useState(0)
  const [isMutating, setIsMutating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mutatingNoExistingArticle, setMutatingNoExistingArticle] = useState(false)

  // Fetch families
  useEffect(() => {
    ;(async () => {
      const families = await getFamilies()

      setFamilies(families)
    })()
  }, [])

  // fetch table articles
  useEffect(() => {
    ;(async () => {
      const articles = await getArticlesFiltered('', '', '', '', '')

      setArticles(articles)
    })()
  }, [refetch])

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (formState === FormState.UPDATE) {
      setIsSearching(true)

      if (!term) {
        cleanupForm(true)

        setIsSearching(false)
        return
      }

      const article = await getArticleById(id)

      if (!article) {
        cleanupForm(true)
        setMutatingNoExistingArticle(true)

        toast.error('El artículo no existe')
        setIsSearching(false)
        return
      }

      setMutatingNoExistingArticle(false)

      setId(article.id)
      setName(article.name)
      setDescription(article.description)
      setPrice(article.price)
      setSelectedFamily(article.famId)

      setIsSearching(false)
    }
  }, 300)

  const cleanupForm = (withoutId?: boolean) => {
    setMutatingNoExistingArticle(false)
    cleanupErrors()

    !withoutId && setId('')
    setName('')
    setDescription('')
    setPrice('')
    setSelectedFamily('')
  }

  const cleanupErrors = () => {
    setErrors({ name: '', description: '', price: '', family: '' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    cleanupErrors()
    setIsMutating(true)

    const hasWriterPermission = await checkPermission('write')

    if (!hasWriterPermission) {
      toast.error('No tienes permisos para realizar esta acción')
      setIsMutating(false)
      return
    }

    if (!name || !description || !price || !selectedFamily) {
      setErrors({
        name: !name ? 'El nombre es requerido' : '',
        description: !description ? 'La descripción es requerida' : '',
        price: !price ? 'El precio es requerido' : '',
        family: !selectedFamily ? 'La familia es requerida' : '',
      })
      setIsMutating(false)
      return
    }

    if (!Number(price)) {
      setErrors({ ...errors, price: 'El precio debe ser un número' })
      setIsMutating(false)
      return
    }

    if (formState === FormState.UPDATE && !id) {
      toast.error('El artículo que tratas de actualizar no existe')
      setIsMutating(false)
      return
    }

    formState === FormState.CREATE
      ? await createArticle({
          id: String(articles.length + 1),
          name,
          description,
          price,
          famId: selectedFamily,
        })
      : await updateArticle({
          id,
          name,
          description,
          price,
          famId: selectedFamily,
        })

    setRefetch(refetch + 1)

    toast.success(
      `Artículo ${formState === FormState.CREATE ? 'creado' : 'actualizado'} correctamente`
    )
    setIsMutating(false)
  }

  const deleteArticle = async () => {
    setIsDeleting(true)

    if (formState !== FormState.UPDATE) {
      setIsDeleting(false)
      return
    }

    if (!id) {
      setIsDeleting(false)
      toast.error('No se ha seleccionado ningún artículo')
      return
    }

    const article = await getArticleById(id)

    if (!article) {
      setIsDeleting(false)
      toast.error('El artículo que tratas de eliminar no existe')
      return
    }

    await removeArticle(id)
    toast.success('Artículo eliminado correctamente')
    setRefetch(refetch + 1)

    cleanupForm()
    setIsDeleting(false)
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
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex justify-between w-full'>
            <div className='flex gap-4'>
              <RadioButton
                onChange={() => {
                  cleanupForm()
                  setFormState(FormState.CREATE)
                }}
                defaultChecked
                name='create'
                value={FormState.CREATE}
                checked={formState === FormState.CREATE}
                label='Nuevo'
              />
              <RadioButton
                onChange={() => {
                  cleanupForm()
                  setFormState(FormState.UPDATE)
                }}
                name='update'
                value={FormState.UPDATE}
                label='Modificar'
                checked={formState === FormState.UPDATE}
              />
            </div>
            <div className='flex gap-4'>
              <Button
                type='button'
                onClick={() => {
                  cleanupForm()
                }}
                variant='secondary'
              >
                Limpiar
              </Button>
              <Button disabled={isMutating} type='submit'>
                Grabar
              </Button>
              <Button
                onClick={deleteArticle}
                disabled={isDeleting || formState === FormState.CREATE || mutatingNoExistingArticle}
                withNoIcon={formState === FormState.CREATE || mutatingNoExistingArticle}
                variant='danger'
                type='button'
              >
                Eliminar
              </Button>
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
              disabled={mutatingNoExistingArticle}
              value={name}
              label='Nombre'
              onChange={(e) => setName(e.target.value)}
              errorMessage={errors.name}
            />
            <Input
              disabled={mutatingNoExistingArticle}
              value={description}
              label='Descripción'
              onChange={(e) => setDescription(e.target.value)}
              errorMessage={errors.description}
            />
            <Input
              disabled={mutatingNoExistingArticle}
              value={price}
              label='Precio'
              onChange={(e) => setPrice(e.target.value)}
              errorMessage={errors.price}
            />
            <Select
              disabled={mutatingNoExistingArticle}
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
