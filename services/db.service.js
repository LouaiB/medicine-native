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

const INTAKE_ID_COL = 'intakeId';
const INTAKE_TAKER_ID_COL = 'takerFk';
const INTAKE_MEDICINE_ID_COL = 'medicineFk';
const INTAKE_INTERVAL_COL = 'interval';

const db = SQLite.openDatabase("medicine.db");

export const DbService = {
    init: () => {
        db.transaction(tx => {
            // Create tables if not exist
            tx.executeSql(
              `create table if not exists ${TAKER_TABLE} (${TAKER_ID_COL} integer primary key not null, ${TAKER_NAME_COL} text, ${TAKER_AGE_COL} integer);`,
              [],
              () => {console.info(`${TAKER_TABLE} table created`)},
              err => console.error(err)
            );
            tx.executeSql(
              `create table if not exists ${MEDICINE_TABLE} (${MEDICINE_ID_COL} integer primary key not null, ${MEDICINE_NAME_COL} text, ${MEDICINE_QUANTITY_COL} integer);`,
              [],
              () => {console.info(`${MEDICINE_TABLE} table created`)},
              err => console.error(err)
            );
            const intakeSQL = `create table if not exists ${INTAKE_TABLE} (${INTAKE_ID_COL} integer primary key not null, ${INTAKE_TAKER_ID_COL} integer, ${INTAKE_MEDICINE_ID_COL} integer, ${INTAKE_INTERVAL_COL} text, foreign key(${INTAKE_TAKER_ID_COL}) references ${TAKER_TABLE}(${TAKER_ID_COL}), foreign key(${INTAKE_MEDICINE_ID_COL}) references ${MEDICINE_TABLE}(${MEDICINE_ID_COL}));`;
            console.log(intakeSQL);
            tx.executeSql(
              intakeSQL,
              [],
              () => {console.info(`${INTAKE_TABLE} table created`)},
              err => console.error(err)
            );
        });
    },

    addTaker: (name, age, success, failure) => {
        if(!name || !age) return false;

        db.transaction(tx => {
            tx.executeSql(`insert into ${TAKER_TABLE} (name, age) values (?, ?)`, [name, age], success, failure);
        });
    },

    getTakers: (success, failure) => {
        db.transaction(tx => {
            tx.executeSql(`select * from ${TAKER_TABLE}`, [],
                (_, { rows: { _array } }) => {
                    console.info(`takers fetched`);
                    success(_array);
                },
                err => { failure(); }
            )
        })
    },
}