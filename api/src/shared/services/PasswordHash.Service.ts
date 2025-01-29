import bcrypt from "bcrypt"


export const passwordHash = async (password: string) => {
    try {
        const hashed = await bcrypt(password, 8);
        return hashed;
    } catch {
        return 0
    }
}   
