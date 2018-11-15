const alasql = require('alasql');

class Table{
    static init(){
        
        alasql('CREATE TABLE user (id INT PRIMARY KEY AUTO_INCREMENT, email STRING, password STRING);');

        alasql('INSERT INTO user (email,password) VALUES ("elpoeta@gmail.com","elpoeta")');
        
    }

    static insert(user){
        alasql(`INSERT INTO user (email, password) VALUES ("${user.email}","${user.password}")`);
    }

    static userById(id){
        const res = alasql(`SELECT * FROM user where id = ${id}`);
        return res[0];
    }

    static findByEmail(email){
        const res = alasql(`SELECT * FROM user where email = "${email}"`);
        if(res.length == 1)
        {     return true;
        }

        return false;

    }
}

module.exports = Table;