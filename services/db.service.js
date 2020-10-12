import * as SQLite from 'expo-sqlite';

// TABLES
const TAKER_TABLE = 'taker';
const MEDICINE_TABLE = 'medicine';
const INTAKE_TABLE = 'intake';

// COLUMNS
const TAKER_ID_COL = 'takerId';
const TAKER_NAME_COL = 'name';
const TAKER_AGE_COL = 'age';

const MEDICINE_ID_COL = 'medicineId';
const MEDICINE_NAME_COL = 'name';
const MEDICINE_QUANTITY_COL = 'quantity';

const INTAKE_TAKER_ID_COL = 'takerFk';
const INTAKE_MEDICINE_ID_COL = 'medicineFk';
const INTAKE_INTERVAL_COL = 'interval';

const db = SQLite.openDatabase("medicine.db");

export const DbService = {
    init: () => {
        db.transaction(tx => {
            // Create tables if not exist
            tx.executeSql(
              `create table if not exists ${TAKER_TABLE} (${TAKER_ID_COL} integer primary key not null, ${TAKER_NAME_COL} text, ${TAKER_AGE_COL} integer);`
            );
            tx.executeSql(
              `create table if not exists ${MEDICINE_TABLE} (${MEDICINE_ID_COL} integer primary key not null, ${MEDICINE_NAME_COL} text, ${MEDICINE_QUANTITY_COL} integer);`
            );
            tx.executeSql(
              `create table if not exists ${INTAKE_TABLE} (${INTAKE_TAKER_ID_COL} integer, ${INTAKE_MEDICINE_ID_COL} integer, ${INTAKE_INTERVAL_COL} text, foreign key(${INTAKE_TAKER_ID_COL} references ${TAKER_TABLE}(${TAKER_ID_COL})), foreign key(${INTAKE_MEDICINE_ID_COL} references ${MEDICINE_TABLE}(${MEDICINE_ID_COL})));`
            );
        });
    },

    addTaker: (name, age) => {
        if(!name || !age) return false;

        // TODO: Error handling
        db.transaction(tx => {
            tx.executeSql(`insert into ${TAKER_TABLE} (name, age) values (?, ?)`, [name, age]);
        });
    }
}