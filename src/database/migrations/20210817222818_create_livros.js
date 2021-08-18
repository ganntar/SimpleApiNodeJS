
exports.up = function(knex) {
  return knex.schema.createTable('livros', function (table){
      table.string('id').primary();
      table.string('titulo').notNullable();
      table.string('isbn').notNullable();
      table.string('autor').notNullable();
      table.string('editora').notNullable();
      table.decimal('ano').notNullable();
      table.string('idioma').notNullable();
      table.decimal('peso').notNullable();
      table.decimal('comprimento').notNullable();
      table.decimal('largura').notNullable();
      table.decimal('altura').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('livros');
};
