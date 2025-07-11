import DataUriParser from 'datauri/parser.js';
import path from 'path'

const parser = new DataUriParser();
const getDataUri = (file) => {
   const extensionName = path.extname(file.originalname).toString();
   return parser.format(extensionName, file.buffer).content;
}
export default getDataUri;
