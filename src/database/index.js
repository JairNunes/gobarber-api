import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Appointment from '../app/models/Appointment';
import File from '../app/models/File';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(connection))
      .map(model => model.associate && model.associate(connection.models));
  }
}

export default new Database();
