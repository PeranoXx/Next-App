import knex from "knex/index"
export default async function findByEmail(email) {
    return await knex('users').where('email', email).select('id','name','email','password').first()
}