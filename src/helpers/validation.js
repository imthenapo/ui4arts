import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'

const passwordSchema = new PasswordValidator()

// Add properties to it
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123'])

export const validatePassword = string => passwordSchema.validate(string)

export const validateEmail = string => EmailValidator.validate(string)
