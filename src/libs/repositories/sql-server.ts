import sql, { ConnectionError, PreparedStatementError, RequestError, TransactionError } from 'mssql'
import { cookies } from 'next/headers'

export const sqlQuery = async <T>(query: TemplateStringsArray): Promise<SQLQueryResult<T>> => {
  try {
    const username = cookies().get('username')?.value ?? process.env.DB_USER
    const password = cookies().get('password')?.value ?? process.env.BD_PASSWORD

    const pool = await getConnection(username, password)

    if (!pool) {
      return {
        dbError: false,
        error: 'No se pudo conectar a la base de datos',
        success: false,
      }
    }

    const result = await pool.query<T>(query)

    return {
      success: true,
      data: result.recordset as T,
    }
  } catch (error) {
    if (error instanceof RequestError) {
      return {
        dbError: true,
        error: 'Error al ejecutar la consulta',
        success: false,
      }
    }

    if (error instanceof ConnectionError) {
      console.log(error.message)

      return {
        dbError: true,
        error: 'Error al conectar a la base de datos',
        success: false,
      }
    }

    if (error instanceof TransactionError) {
      console.log(error.message)

      return {
        dbError: true,
        error: 'Error al ejecutar la transacción',
        success: false,
      }
    }

    if (error instanceof PreparedStatementError) {
      console.log(error.message)

      return {
        dbError: true,
        error: 'Error al ejecutar la consulta preparada',
        success: false,
      }
    }

    return {
      dbError: true,
      error: 'Error desconocido',
      success: false,
    }
  }
}

export const getConnection = async (username: string, password: string) => {
  try {
    const pool = new sql.ConnectionPool({
      user: username,
      password: password,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    })

    const connection = await pool.connect()

    return connection
  } catch (error) {
    console.error(error)
    return null
  }
}

type SQLQuerySuccessResult<T> = {
  success: true
  data: T
}

type SQLQueryErrorResult<T> = {
  success: false
  error: string
  dbError: boolean
}

type SQLQueryResult<T> = SQLQuerySuccessResult<T> | SQLQueryErrorResult<T>
