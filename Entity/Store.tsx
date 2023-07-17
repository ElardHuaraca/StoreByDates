import { Optional, Model, DataTypes } from 'sequelize'
import { sequelize } from './SequelizeDB';

interface IStoreBuildAttributes extends Optional<IStoreEntity, 'id'> { }


export default class StoreSequelize extends Model<IStoreEntity, IStoreBuildAttributes> implements IStoreEntity {
    id!: string
    name!: string
    ip!: string
    type_id?: number
}

StoreSequelize.init({
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    ip: {
        allowNull: false,
        type: DataTypes.STRING
    },
    type_id: {
        allowNull: true,
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    sequelize: sequelize,
    modelName: 'store'
})

/* const StoreSequelize = sequelize.define<IStoreInstance>('store', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    ip: {
        allowNull: false,
        type: DataTypes.STRING
    },
    type_id: {
        allowNull: true,
        type: DataTypes.INTEGER
    }
})

StoreSequelize.belongsTo(TypeStoreSequelize, {
    foreignKey: 'id',
    as: 'type_store'
})

export { StoreSequelize }
 */