import { Article } from '../types'
import { getArticleMapped } from './mappers'
import { sqlQuery } from './sql-server'

export type SQLArticle = {
  artid: string
  artnombre: string
  artdescripcion: string
  artprecio: string
  famid: string
  famnombre: string
}

const getMany = async (
  id: string,
  name: string,
  description: string,
  price: string,
  familyId: string
): Promise<Article[]> => {
  let query = `
    SELECT id=A.artid, name=A.artnombre, description=A.artdescripcion, price=A.artprecio, famId=A.famid, famName=F.famnombre 
    FROM ARTICULOS A 
    INNER JOIN Familias F ON F.famid = A.famid
  `

  if (id || name || description || price || familyId) {
    query += ' WHERE '
  }

  if (id) {
    query += `artid = ${id} AND `
  }

  if (name) {
    query += `artnombre LIKE '%${name}%' AND `
  }

  if (description) {
    query += `artdescripcion LIKE '%${description}%' AND `
  }

  if (price) {
    query += `artprecio = ${price} AND `
  }

  if (familyId) {
    query += `A.famid = ${familyId}`
  }

  // Remove last AND if needed
  if (query.slice(-5) === ' AND ') {
    query = query.slice(0, -5)
  }

  const result = await sqlQuery<Article>(query)

  if (!result.success) {
    console.log(result.error)
    return []
  }

  return result.data
}

const getById = async (id: string): Promise<Article | null> => {
  const result = await sqlQuery<Article>(`
    SELECT id=A.artid, name=A.artnombre, description=A.artdescripcion, price=A.artprecio, famId=A.famid, famName=F.famnombre 
    FROM ARTICULOS A 
    INNER JOIN Familias F ON F.famid = A.famid
    WHERE A.artid = ${id}
  `)

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return result.data[0]
}

const create = async (article: Omit<Article, 'famName'>): Promise<void> => {
  const result = await sqlQuery<SQLArticle>(`
  INSERT INTO ARTICULOS (artid, artnombre, artdescripcion, artprecio, famid) 
  VALUES (${article.id}, '${article.name}', '${article.description}', ${article.price}, ${article.famId})
`)

  if (!result.success) {
    console.log(result.error)
  }
}

const update = async (article: Omit<Article, 'famName'>): Promise<void> => {
  const result = await sqlQuery<SQLArticle>(`
    UPDATE ARTICULOS SET 
      artnombre = '${article.name}',
      artdescripcion = '${article.description}',
      artprecio = ${article.price},
      famid = ${article.famId}
    WHERE artid = ${article.id}
`)

  if (!result.success) {
    console.log(result.error)
  }
}

const remove = async (id: string): Promise<void> => {
  const result = await sqlQuery<SQLArticle>(`
    DELETE FROM ARTICULOS WHERE artid = ${id}
`)

  if (!result.success) {
    console.log(result.error)
  }
}

export const ArticleRepository = {
  getMany,
  getById,
  create,
  update,
  remove,
}
