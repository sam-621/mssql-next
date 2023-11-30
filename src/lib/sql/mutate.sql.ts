import sql, { RequestError } from 'mssql'
import { cookies } from 'next/headers'
import { getConnection, sqlQuery } from './connection.sql'
import { Article, MutateArticleProcResult } from '../types'

/**
 * Function that update or create an article
 * @param input Article to mutate
 * @returns Success or error
 */
const mutateArticle = async (input: Omit<Article, 'famName'>) => {
  console.log({ input })

  try {
    const username = cookies().get('username')?.value ?? process.env.DB_USER
    const password = cookies().get('password')?.value ?? process.env.BD_PASSWORD

    const pool = await getConnection(username, password)

    if (!pool) {
      return {
        dbError: false,
        error: 'Un error en la conexión ha ocurrido, vuelve a intentarlo',
        success: false,
      }
    }

    const result = await pool
      .request()
      .input('ArtName', sql.VarChar(50), input.name)
      .input('ArtDescription', sql.VarChar(500), input.description)
      .input('ArtPrice', sql.Numeric(12, 2), input.price)
      .input('FamID', sql.Int, input.famId)
      .output('ArtID', sql.Int, input.id)
      .execute<MutateArticleProcResult>('Sp_MutateVentas')

    return {
      success: true,
      data: result.output.ArtID,
    }
  } catch (error) {
    console.log({ error })

    if (error instanceof RequestError) {
      // proc error
      if (error.message.includes('The EXECUTE permission was denied')) {
        return {
          dbError: true,
          error: 'No tienes los permisos necesarios para realizar esta acción',
          success: false,
        }
      }

      // trigger error
      if (error.originalError instanceof AggregateError) {
        return {
          dbError: true,
          error: error.originalError.errors[0].message,
          success: false,
        }
      }

      return {
        dbError: true,
        error: 'Error al ejecutar el procedimiento',
        success: false,
      }
    }

    return {
      dbError: true,
      error: 'Error al ejecutar el procedimiento',
      success: false,
    }
  }
}

/**
 * function that remove the given article
 * @param id article id to remove
 * @returns error or data
 */
const removeArticle = async (id: string) => {
  const result = await sqlQuery<null>(`
    DELETE FROM ARTICULOS WHERE artid = ${id}
`)

  if (!result.success) {
    return {
      error: result.error,
      data: null,
    }
  }

  return {
    error: '',
    data: result.data,
  }
}

export const MutationRepository = {
  mutateArticle,
  removeArticle,
}
