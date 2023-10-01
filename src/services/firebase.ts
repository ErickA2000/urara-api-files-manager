import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { firebaseConfig } from "config";

firebase.initializeApp(firebaseConfig);

class FirebaseStorage {

    private storageRef = firebase.app().storage().ref();
    private storage = getStorage();

    public async uploadImg( folderName: string, imgName: string, imagBase64: string ){

        const response = await this.storageRef.child( folderName+"/"+imgName ).putString( imagBase64, "data_url" );
        return await response.ref.getDownloadURL();

    }

    public async deleteImg( url: string){
        const httpReference = await ref( this.storage, url );
        return await deleteObject( httpReference );
    }

}

export const firebaseStorage = new FirebaseStorage();