import { sequelize } from "@/helpers/DatabaseController";
import { Optional, Model, DataTypes } from 'sequelize'
import { StoreSequelize } from "./Store";

interface ITypeStoreBuildAttributes extends Optional<IType_Store, 'id'> { }
interface ITypeStoreInstance extends Model<IType_Store, ITypeStoreBuildAttributes>, IType_Store {
    createdAt?: Date
    updatedAt?: Date
}


const TypeStoreSequelize = sequelize.define<ITypeStoreInstance>('store', {
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
    foreignKey: 'type_id',
    as: 'stores'
})

export { TypeStoreSequelize }