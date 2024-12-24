export const getBusOperatorSelectFields = (alias: string = 'busOperator') => [
    `${alias}._id`,
    `${alias}.name`,
    `${alias}.phone`,
    `${alias}.email`,
    `${alias}.addresses`,
    `${alias}.schedules`,
];

export const getUserSelectFields = (alias: string = 'users') => [
    `${alias}._id`,
    `${alias}.firstName`,
    `${alias}.lastName`,
    `${alias}.birthday`,
    `${alias}.role`,
];


export const getAddressSelectFields = (alias: string = 'addresses') => [
    `${alias}._id`,
    `${alias}.province`,
    `${alias}.district`,
    `${alias}.commune`,
    `${alias}.addressDetail`,
];

