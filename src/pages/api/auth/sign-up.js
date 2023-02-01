import knex from '../../../../knex';
import encrypt from '../helpers/encrypt'
import findByEmail from '../helpers/findByEmail';

export default async function handler(req, res) {


  const { name, email, password } = req.body
  const checkEmail = await findByEmail(email)
  if (checkEmail) {
    const resp = {
      status: 'error',
      msg: 'Email already exist.'
    }
    return res.status(200).json(resp)
  }
  try {
    const data = {
      name: name,
      email: email,
      password: encrypt(password),
      created_at: Date.now(),
      updated_at: Date.now(),
    }
    const user = await knex('users').insert(data)
    if (user) {
      const resp = {
        status: 'success',
        msg: 'Account created successfully!',
        data: data
      }
      return res.status(200).json(resp)
    }
  } catch (error) {
    const resp = {
      status: 'error',
      msg: 'Oops! Something went wrong.',
    }
    return res.status(200).json(resp)
  }

}
