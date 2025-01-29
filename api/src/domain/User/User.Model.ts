export default class UserModel {
    name: string
    email: string
    CPF: string
    password: string
    passwordConfirm?: string
    addressId?: string

    constructor(name: string, email: string, CPF: string, password: string, addressId?: string) {
        this.name = name;
        this.email = email;
        this.CPF = CPF
        this.password = password;
        this.addressId = addressId;
    }
}