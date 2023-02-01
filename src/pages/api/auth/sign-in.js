import knex from "knex/index";
import findByEmail from "../helpers/findByEmail";
import decrypt from "../helpers/decrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {

  const { email, password } = req.body
  const user = await findByEmail(email)
  if (!user) {
    const resp = {
      status: 'error',
      msg: 'Invalid email or password.'
    }
    return res.status(200).json(resp)
  }

  if (!decrypt(password, user.password)) {
    const resp = {
      status: 'error',
      msg: 'Invalid email or password.'
    }
    return res.status(200).json(resp)
  }

  const token = jwt.sign(user, process.env.JWT_SECRET);
  const data = {
    user_id: user.id,
    token: token,
    is_expired: false,
    created_at: Date.now(),
    updated_at: Date.now(),
  }
  try {
    const databaseToken = await knex('tokens').insert(data).onConflict('user_id').merge(['user_id', 'token', 'is_expired'])
    if (databaseToken) {
      const resp = {
        status: 'success',
        msg: 'Signed in successfully!',
        data: { token: token, user: user }
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
