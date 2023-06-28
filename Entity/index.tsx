import StoreSequelize from "./Store";
import TypeStoreSequelize from "./TypeStore";

TypeStoreSequelize.hasMany(StoreSequelize, {
    foreignKey: 'type_id',
})

StoreSequelize.belongsTo(TypeStoreSequelize)



export { StoreSequelize, TypeStoreSequelize }