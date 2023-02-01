import bcrypt from 'bcrypt'
const salt = 10

export default function encrypt (value) {
    return bcrypt.hashSync(value, salt)
}