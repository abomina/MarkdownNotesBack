import * as fs from 'fs/promises';

export const login = async (user, pass) => {
    var data = await fs.readFile("./data/users.json");
    var users = JSON.parse(data);
    var status = 0;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == user && users[i].password == pass) {
            status=1;
        }
    }
    if (status==0){
        return {
            status: false,
            data: ""
        };
    }else{
        return {
            status: true,
            data: ""
        };
    }
    
}