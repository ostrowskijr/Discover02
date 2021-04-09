const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const database = () => 
    open({
        filename : './database.sqlite',
        driver : sqlite3.Database        
    });

module.exports = {
    database
}