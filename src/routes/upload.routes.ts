import { Router } from "express";
import { uploadController } from "@Controllers/upload.controller";
import { autenticacion } from "@Middlewares/index";

class UploadRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post("/upload-img", [ autenticacion.TokenValidation, autenticacion.isAdminOrModerador], uploadController.uploadImg);
        this.router.delete("/delete-img", [ autenticacion.TokenValidation, autenticacion.isAdminOrModerador], uploadController.deleteImg);
    }
}

const uploadRoutes = new UploadRoutes();
export default uploadRoutes.router; 