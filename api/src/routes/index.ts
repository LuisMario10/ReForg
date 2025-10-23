import { Router } from "express";

import { ProductsController } from "./../controllers/index";

export const router: Router = Router();

router.get("/", (_, response) => {
    response.send("ReForg API");
});

