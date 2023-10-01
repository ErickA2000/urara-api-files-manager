import { Router } from "express";
import uploadRoutes from "./upload.routes";


class Routes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.use( '/upload', uploadRoutes );
    }
}

const routes = new Routes();
export default routes.router;