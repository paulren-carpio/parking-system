export async function seed(knex: any): Promise<any> {
  const tableName = "parking_space";
  await knex.raw("SET FOREIGN_KEY_CHECKS = 0");
  await knex(tableName)
    .truncate()
    .then(() => {
      // Inserts seed entries
      const slots = [];
      const sizes = ["SP", "MP", "LP"];

      for (let i = 1; i <= 60; i++) {
        slots.push({
          slotNumber: i,
          maxAllowedSize: sizes[Math.floor(Math.random() * sizes.length)],
        });
      }

      return knex(tableName).insert(slots);
    });
  return knex.raw("SET FOREIGN_KEY_CHECKS = 1");
}
