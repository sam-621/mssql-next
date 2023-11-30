import { Article, Family } from '../types'
import { sqlQuery } from './connection.sql'

const getManyArticles = async (
  id: string,
  name: string,
  description: string,
  price: string,
  familyId: string
): Promise<{ data: Article[]; error: string }> => {
  let query = `SELECT * FROM VW_ARTICULOS VA`

  if (id || name || description || price || familyId) {
    query += ' WHERE '
  }

  if (id) {
    query += `id = ${id} AND `
  }

  if (name) {
    query += `name LIKE '%${name}%' AND `
  }

  if (description) {
    query += `description LIKE '%${description}%' AND `
  }

  if (price) {
    query += `price = ${price} AND `
  }

  if (familyId) {
    query += `famId = ${familyId}`
  }

  // Remove last AND if needed
  if (query.slice(-5) === ' AND ') {
    query = query.slice(0, -5)
  }

  const result = await sqlQuery<Article>(query)

  if (!result.success) {
    console.log(result.error)
    return { data: [], error: result.error }
  }

  return { data: result.data, error: '' }
}

const getManyFamilies = async () => {
  const result = await sqlQuery<Family>(`SELECT id=F.famid, name=F.famnombre FROM Familias F`)

  if (!result.success) {
    console.log(result.error)
    return []
  }

  return result.data
}

const getArticleById = async (id: string) => {
  const result = await sqlQuery<Article>(`
    SELECT id=A.artid, name=A.artnombre, description=A.artdescripcion, price=A.artprecio, famId=A.famid, famName=F.famnombre 
    FROM ARTICULOS A 
    INNER JOIN Familias F ON F.famid = A.famid
    WHERE A.artid = ${id}
  `)

  if (!result.success) {
    return {
      error: result.error,
      data: null,
    }
  }

  return {
    error: '',
    data: result.data[0],
  }
}

export const QueryRepository = {
  getManyArticles,
  getArticleById,
  getManyFamilies,
}
