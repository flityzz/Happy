import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload';

//controller
import OrphanageController from './controllers/OrphanagesController';
import UserController from './controllers/UserController';

const routes = Router();
const upload = multer(uploadConfig);

//gets
routes.get('/users', UserController.index)
routes.get('/users/:user_id', UserController.show)

routes.get("/orphanages", OrphanageController.index);
routes.get("/orphanages/:id", OrphanageController.show);

//posts
routes.post("/users/:user_id/orphanages", upload.array('images'), OrphanageController.create); //token route
routes.post("/users", UserController.create);
routes.post("/users/auth", UserController.authenticate)


//deletes
routes.delete("/users/:user_id/orphanages/:id", OrphanageController.delete); //token route


export default routes;
