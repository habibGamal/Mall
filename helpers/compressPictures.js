import imageCompression from 'browser-image-compression'

export function compressPictures(pictures) {
    // => this will return array of promises
    return pictures.map(async p => {
        // => compress the picture and buffer it 
        let buffer = await imageCompression(p.picture, { maxSizeMB: .05 })
        return buffer;
    });
}