import imageCompression from 'browser-image-compression';
export default function showFiles(file) {
    const options = { 
        maxSizeMB: 1,     // optional, initial quality value between 0 and 1 (default: 1)
      }
    return new Promise(async(resolve,reject)=>{
            if (file.type.startsWith('image/')){
                const reader = new FileReader();
                const compressedFile = await imageCompression(file, options);
                reader.onload = (function(){
                    return function (e) {
                        resolve(e);
                    }
                })();
                reader.readAsDataURL(compressedFile);
            }else{
                reject()
            }
        
    });
}