const Database = require('./config').database;

// Inicia conexão com database Sqlite.
const initDb = {
    async init() {
        const db = await Database();
        //
        // Function exec executa código SQL no database Sqlite.(Profile)
        await db.exec(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthlyBudget INT,
                daysPerWeek INT,
                hoursPerDay INT,
                vacationPerYear INT,
                valueHours INT
            )
        `);
        //
        // Criar table jobs
        await db.exec(`
            CREATE TABLE job (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                dailyHours INT,
                totalHours INT,
                createdAt DATETIME
            )
        `);
        //
        // Inserir dados inicias nas tables
        await db.run(`
            insert into profile (name, avatar, daysPerWeek, hoursPerDay, hoursPerDay, vacationPerYear, valueHours)
                values ('Luis A Ostrowski Jr', 'https://github.com/ostrowskijr.png', 12500, 5, 6, 4, 75);
        `);
        await db.run(`
            insert into job (name, dailyHours, totalHours, createdAt)
                values ("Pizzaria Guloso", 2, 60, '09/04/2021');
        `);
        await db.run(`
            insert into job (name, dailyHours, totalHours, createdAt)
                values ("OneTwo Project", 3, 47, '09/04/2021');
        `);
        //
        // Encerrar conexão com database Sqlite
        await db.close();
    }
};

initDb.init();
