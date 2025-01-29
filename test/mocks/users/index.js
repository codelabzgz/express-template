export const validUser = {
  email: 'johndoe@example.com',
  password: '12345678'
}

export const invalidUser = {
  email: '',
  password: ''
}

export const invalidParams = { email: 'johndoe@example.com' }
export const invalidCredentials = { email: 'johndoe@example.com', password: 'wrongpassword' }
export const nonExistentUser = { email: 'nonexistent@example.com', password: 'randompass' }
