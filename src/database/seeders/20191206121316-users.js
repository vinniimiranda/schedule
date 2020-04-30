'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'admin',
          email: 'admin@admin.com',
          password_hash:
            '$2a$08$lb52PpIMVu9Gx5nuH229Zu6p2UZoOaxb2GA2wyaTR4szMtPfBZwXm',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
