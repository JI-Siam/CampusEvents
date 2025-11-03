import { Injectable } from '@nestjs/common';

@Injectable() //Injectable() -> Decorator; It's an automatic service provider 
export class AdminService {

    private admins = [
        {id: 1, uname: "Sushanto", age: 25},
        {id: 2, uname: "Vharati", age: 26},
        {id: 3, uname: "Kumar", age: 24}
    ]

    getAdminInfo(){
        return this.admins;
    }

    getAdminById(id: number){
        return this.admins.find((admin) => admin.id === id)
    }
}
