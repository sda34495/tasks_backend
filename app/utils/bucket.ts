import env from '#start/env';
import { v2 as bucket } from 'cloudinary';

bucket.config({
    cloud_name: env.get('CLOUD_NAME'),
    api_key: env.get('CLOUD_API_KEY'),
    api_secret: env.get('API_SECRET')
});



export default bucket;

