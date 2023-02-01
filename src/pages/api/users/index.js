import knex from "knex/index"
import middleware from "../middleware"

export default async function handler(req, res) {
    middleware(req, res, async() => {
        var { limit, field, dir, search } = req.query
        if (!field) {
            field = 'id'
        }
        if (!dir) {
            dir = 'desc'
        }
        var users = await knex('users').where('name', 'like', '%' + search + '%').orWhere('email', 'like', '%' + search + '%').orderBy(field, dir).limit(limit)
        res.status(200).json({ name: users })
    });
}
