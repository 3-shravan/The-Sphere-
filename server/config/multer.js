import multer from 'multer';
const upload = multer({
   storage: multer.memoryStorage()
})
export const singleUpload = (fieldname) => upload.single(fieldname);