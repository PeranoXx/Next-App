import knex from "knex/index";
import middleware from "../middleware";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  middleware(req, res, async () => {
    try {
      const signOut = await knex('tokens')
        .where('user_id', req.user.id)
        .update({
          is_expired: true,
        })
      if (signOut) {
        const resp = {
          status: 'success',
          msg: 'Signed out successfully!'
        }
        return res.status(200).json(resp)
      }
    } catch (error) {
      const resp = {
        status: 'error',
        msg: 'Oops! Something went wrong.',
        error: error
      }
      return res.status(200).json(resp)
    }

  });
}
