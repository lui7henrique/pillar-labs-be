import { z } from 'zod'

// Zod schema for environment variables
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string(),
})

// Parsing the environment variables, and throwing an error if any of the variables are missing
export const env = envSchema.parse(process.env)
