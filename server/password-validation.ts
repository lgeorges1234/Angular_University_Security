import * as passwordValidator from 'password-validator';

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
.is().min(10)                                    // Minimum length 8                        
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export function validatePassword(password: string) {
    return schema.validate(password, {list:true});
};