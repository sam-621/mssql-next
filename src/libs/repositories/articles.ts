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

const create = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<SQLArticle>(`
  INSERT INTO articles (name, description, price, famId)
  VALUES (${article.name}, ${article.description}, ${article.price}, ${article.famId})
  RETURNING *
`)

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return getArticleMapped(result.data[0])
}

const update = async (article: Article): Promise<Article | null> => {
  const result = await sqlQuery<SQLArticle>(`
  UPDATE articles
  SET name = ${article.name}, description = ${article.description}, price = ${article.price}, famId = ${article.famId}
  WHERE id = ${article.id}
  RETURNING *
`)

  if (!result.success) {
    console.log(result.error)
    return null
  }

  return getArticleMapped(result.data[0])
}

export const ArticleRepository = {
  getMany,
  create,
  update,
}
