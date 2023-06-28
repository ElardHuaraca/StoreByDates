import { sequelize } from "@/helpers/DatabaseController";
import { Optional, Model, DataTypes } from 'sequelize'
import { TypeStoreSequelize } from "./TypeStore";

interface IStoreBuildAttributes extends Optional<IStoreEntity, 'id'> { }
interface IStoreInstance extends Model<IStoreEntity, IStoreBuildAttributes>, IStoreEntity {
    createdAt?: Date
    updatedAt?: Date

}

const StoreSequelize = sequelize.define<IStoreInstance>('store', {
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

StoreSequelize.hasMany(TypeStoreSequelize, {
    foreignKey: 'type_id',
    sourceKey: 'id',
    as: 'type_store'
})

export { StoreSequelize }
