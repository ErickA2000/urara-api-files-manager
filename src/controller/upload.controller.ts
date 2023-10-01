import { CODES_HTTP } from "@Constants/global";
import { firebaseStorage } from "@Services/firebase";
import { Request, Response } from "express";

class UploadController{

    public async uploadImg( req: Request, res: Response ) {

        const { nombreCarpeta, imgs } = req.body;

        let urlImgs: string[] = [];

        for( let img of imgs ) {
            try {
                const imgName = img.nombre + "_" + Date.now();
                const urlImg = await firebaseStorage.uploadImg( nombreCarpeta, imgName, img.base64 );
                
                urlImgs.push( urlImg );

            } catch (error) {
                //si ocurre un error antes de subir todas las imagenes eliminar las que ya se subieron
                for( let img of urlImgs ){
                    await firebaseStorage.deleteImg( img );
                }
                
                return res.status( CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error al subir imagenes:" + error
                });
            }
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Imagenes subidas",
            data: urlImgs
        });

    }

    public async deleteImg( req: Request, res: Response){
        const { url } = req.query;

        try {
            await firebaseStorage.deleteImg( url?.toString() || "" );
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error al eliminar imagen: " + error
            });
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Delete image"
        });
    }
}

export const uploadController = new UploadController();

interface reqDataImg{
    nombre: string;
    base64: string;
}