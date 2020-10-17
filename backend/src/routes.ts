import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload';

//controller
import OrphanageController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

//gets
routes.get("/orphanages", OrphanageController.index);
routes.get("/orphanages/:id", OrphanageController.show);

//posts
routes.post("/orphanages", upload.array('images'), OrphanageController.create);

//deletes
routes.delete("/orphanages/:id", OrphanageController.delete);


export default routes;
