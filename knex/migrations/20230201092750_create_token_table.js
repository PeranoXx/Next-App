/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('tokens', function (table) {
        table.increments('id');
        table.string('user_id', 255).notNullable().unique();
        table.text('token').notNullable();
        table.boolean('is_expired').notNullable();
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("tokens");
};
