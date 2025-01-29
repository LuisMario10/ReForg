import UserModel from "./User.Model";
import { PrismaClient } from "@prisma/client";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

export default class UserRepository {

    public static create(datas: UserModel) {
        try {
            new PrismaClient().user.create({
                data: {
                    name: datas.name,
                    email: datas.email,
                    password: datas.password,
                    code_cpf: datas.CPF
                }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static findAll() {
        try { return new PrismaClient().user.findMany() }
        catch { throw PrismaClientRustPanicError }
    }

    public static findById(id: string) {
        try {
            return new PrismaClient().user.findFirst({
                where: { id: id }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static findByCPF(cpf: string) {
        try {
            
            return new PrismaClient().user.findFirst({
                where: { code_cpf: cpf }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static findByEmail(email: string) {
        try {
            return new PrismaClient().user.findFirst({
                where: {
                    email: email
                }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static update(id: string, updateDatas: UserModel) {
        try {
            new PrismaClient().user.update({
                where: {
                    id: id
                },
                data: {
                    name: updateDatas.name,
                    email: updateDatas.email,
                    password: updateDatas.password,
                     
                }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static updateByEmail(email: string, updateDatas: UserModel) {
        try {
            new PrismaClient().user.update({
                where: {
                    email: email
                },
                data: {
                    name: updateDatas.name,
                    email: updateDatas.email,
                    password: updateDatas.password,
                    code_cpf: updateDatas.CPF
                }
            })
        } catch(e) {
            return e
        }
    }

    public static delete(id: string) {
        try {
            new PrismaClient().user.delete({
                where: {
                    id: id
                }
            })
        } catch(e) {
            return e
        }
    }

    public static deleteByEmail(email: string) {
        try {
            new PrismaClient().user.delete({
                where: {
                    email: email
                }
            })
        } catch(e) {
            return e
        }
    }

}