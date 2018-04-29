module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'users', [
      { email: "phuonglinh83@gmail.com", screen_name: 'Lillyyyyyy',password: "$2b$10$nzRwHRUXkrV27qYhK9/vBeQiqtVFpjBR9qfIVKS3w15vtlcKONtG6"},
      { email: "abc1@def.xyz", screen_name: 'Devil_666',password: "$2b$10$OJ8cDQB4AtnpIwmdwuEZCuct.Pu1fpkXKd0UicN3Tg62yYrPCCnpm"},
      { email: "abc2@def.xyz", screen_name: 'MastChief',password: "$2b$10$DOxCk9DnvuuQoNhubOnbJOv521RBf2OIRMqT5Mz4ZZ0qsDDi5p33S"},
      { email: "abc3@def.xyz", screen_name: 'Mr. P',password: "$2b$10$R7uDA6AmRDlfSL4kLadkweRRoYPIDTbPjIlTGdglh604UrYAmtT76"},
      { email: "abc4@def.xyz", screen_name: 'IceT',password: "$2b$10$CyZRS0jwjVi/rq5Qa/Lm3eKhz8n7BYheCL5BKpKLId98ux2cNi/W2"},
      { email: "abc5@def.xyz", screen_name: 'XxXSlayerXxX',password: "$2b$10$pfqCZL043R9A2TA9.cbEb.1pY5ZJ8Sfq99PJO6olLlg.p4zgQxw12"},
      { email: "abc6@def.xyz", screen_name: 'Michelangelo',password: "$2b$10$mStXt4RPTtyKfcj1UmH6uuvDTVcl.sBC01Vh72UGQvSkbsyc0vHly"},
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};
