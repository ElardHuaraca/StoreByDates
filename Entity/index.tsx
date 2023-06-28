import StoreSequelize from "./Store";
import TypeStoreSequelize from "./TypeStore";

TypeStoreSequelize.hasMany(StoreSequelize, {
    foreignKey: 'type_id',
})

StoreSequelize.belongsTo(TypeStoreSequelize, {
    foreignKey: 'type_id',
})

export { StoreSequelize, TypeStoreSequelize }