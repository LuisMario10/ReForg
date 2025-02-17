export default class UserModel {
    id?: string
    name: string
    email: string
    CPF?: string
    password: string
    passwordConfirm?: string
    addressId?: string

    constructor(name: string, email: string, password: string, addressId?: string, CPF?: string) {
        this.name = name;
        this.email = email;
        this.CPF = CPF;
        this.password = password;
        this.addressId = addressId;
    }
}