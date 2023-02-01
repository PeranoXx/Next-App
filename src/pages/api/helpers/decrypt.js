import bcrypt from 'bcrypt'

export default  function decrypt (value, compare) {
    return bcrypt.compareSync(value, compare)
}