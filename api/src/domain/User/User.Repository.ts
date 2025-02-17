import UserModel from "./User.Model";
import { PrismaClient } from "@prisma/client";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

export default class UserRepository {

    public static async create(datas: UserModel) {
        await new PrismaClient().user.create({
            data: {
                name: datas.name,
                email: datas.email,
                password: datas.password,
                
            }
        })
    }

    public static async findAll() {
        return await new PrismaClient().user.findMany()
    }

    public static async findById(id: string) {
        try {
            return await new PrismaClient().user.findFirst({
                where: { 
                    id: id 
                }
            });       
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static async findByCPF(cpf: string) {
        try {
            return await new PrismaClient().user.findFirst({
                where: { code_cpf: cpf }
            });
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static async findByEmail(email: string) {
        try {
            return await new PrismaClient().user.findFirst({
                where: {
                    email: email
                }
            })
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static async update(id: string, updateDatas: UserModel) {
        try {
            await new PrismaClient().user.update({
                where: {
                    id: id
                },
                data: {
                    name: updateDatas.name,
                    email: updateDatas.email,
                    password: updateDatas.password,
                }
            });
        } catch {
            throw PrismaClientRustPanicError
        }
    }

    public static async updateByEmail(email: string, updateDatas: UserModel) {
        try {
            await new PrismaClient().user.update({
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

    public static async delete(id: string) {
        try {
            await new PrismaClient().user.delete({
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

