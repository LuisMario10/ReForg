import * as Create from "./Create";
import * as GetAll from "./GetAll";
import * as GetByID from "./GetByID";
import * as Update from "./Update";
import * as DeleteByID from "./DeleteByID";

export const UserController = {
    ...Create,
    ...GetAll,
    ...GetByID,
    ...Update,
    ...DeleteByID
}
