export default class UserModel {
    name: string
    email: string
    CPF: string
    password: string
    address?: string

    constructor(name: string, email: string, CPF: string, password: string, address?: string) {
        this.name = name;
        this.email = email;
        this.CPF = 
        this.password = password;
        this.address = address;
    }
}