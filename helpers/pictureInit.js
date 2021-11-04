import { Main } from "../redux/dispatcher";
import showFiles from "./showFiles";

export default function pictureInit(e, pictureId = null) {
    let files = e.target.files;
    if (files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
            showFiles(files[i]).then(e => {
                // => files[i] is the whole file
                // => base is the base64 of the file
                Main.setPicture({ picture: files[i], base: e.target.result },pictureId);
            });
        }
    }
}