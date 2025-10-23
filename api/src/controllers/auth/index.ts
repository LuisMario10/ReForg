import * as Login from "./Login"
import * as Logout from "./Logout"

export const AuthController = {
    ...Login,
    ...Logout
}