import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class Fotos extends Model {
  static init(sequelize) { //PASSADO COMO ARGUMENTO PARA O INIT A CONEXÃO COM SEQUELIZE (OBS: O NOME DA CONEXÃO DEVE SER SEQUELIZE)
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo original name não pode ser vazio!'
          }
        }
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo file name não pode ser vazio!'
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        }
      }
    }, {
      sequelize,
      tableName: 'fotos'
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id'});
  }
}
