export {}

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      BD_PASSWORD: string
      DB_SERVER: string
    }
  }
}
