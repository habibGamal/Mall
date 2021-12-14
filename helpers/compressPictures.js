import imageCompression from 'browser-image-compression'

export function compressPictures(pictures) {
    // => this will return array of promises
    return pictures.map(async picture => {
        // => compress the picture and buffer it 
        let compressedPicture = await imageCompression(picture.file, { maxSizeMB: .05 })
        return compressedPicture;
    });
}