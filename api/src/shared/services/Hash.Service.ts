import bcrypt from "bcrypt"

export default class Hash {

    public static async generateHash(password: string): Promise<string> { 
        return await bcrypt.hash(password, (await bcrypt.genSalt(8)));
    }

    public static async decodeHash(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHashed);
    }   

}