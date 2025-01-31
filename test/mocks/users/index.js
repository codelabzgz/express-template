export const signUpValues = {
  validUser: {
    email: 'su-valid@example.com',
    password: '12345678'
  },
  invalidUser: {
    email: '',
    password: ''
  }
}

export const signInValues = {
  validUser: {
    email: 'si-valid@example.com',
    password: '12345678'
  },
  invalidParams: {
    email: 'invalidparams@example.com'
  },
  invalidCredentials: {
    email: 'si-valid@example.com', password: 'wrongpassword'
  },
  nonExistentUser: {
    email: 'nonexistent@example.com', password: 'randompass'
  }
}

export const signOutValues = {
  validUser: {
    email: 'so-valid@example.com',
    password: '12345678'
  }
}
