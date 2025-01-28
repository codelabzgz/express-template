import crypto from 'crypto'
import { faker } from '@faker-js/faker'

// Función para generar usuarios de ejemplo con Faker.js
export const generateUsers = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: crypto.randomUUID(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({
      firstName,
      lastName,
      allowSpecialCharacters: false
    }),
    emailVerified: faker.date.past().getTime(),
    image: faker.image.avatar()
  }
}
