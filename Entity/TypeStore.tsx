import { Optional, Model, DataTypes } from 'sequelize'
import { sequelize } from './SequelizeDB'
import StoreSequelize from './Store'

interface ITypeStoreBuildAttributes extends Optional<IType_Store, 'id'> { }
interface ITypeStoreInstance extends Model<IType_Store, ITypeStoreBuildAttributes>, IType_Store {
    createdAt?: Date
    updatedAt?: Date
}

export default class TypeStoreSequelize extends Model<IType_Store, ITypeStoreBuildAttributes> implements IType_Store {
    id!: number
    name!: string
}

TypeStoreSequelize.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    sequelize: sequelize,
    modelName: 'type_store'
})

/* const TypeStoreSequelize = sequelize().define<ITypeStoreInstance>('store', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

TypeStoreSequelize.hasMany(StoreSequelize, {
    foreignKey: 'id',
    sourceKey: 'type_id',
    as: 'stores'
})

export { TypeStoreSequelize } */