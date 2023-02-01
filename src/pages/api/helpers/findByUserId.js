import knex from "knex/index"
export default async function findByUserId(table, id) {
    return await knex(table).where('user_id', id).first()
}