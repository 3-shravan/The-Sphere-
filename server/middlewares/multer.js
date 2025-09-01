import multer from 'multer';
const upload = multer({
   storage: multer.memoryStorage()
})
export const singleUpload = (fieldname) => upload.single(fieldname);
export const multipleUpload = (fieldname, maxCount) => upload.array(fieldname, maxCount);
