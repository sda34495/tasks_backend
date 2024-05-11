import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import ProfilesController from '#controllers/profiles_controller'



router.group(() => {
    router.post('/upload-profile-picture', [ProfilesController, 'uploadProfilePicture'])
    router.get('/get-profile', [ProfilesController, 'getProfile'])

}).prefix('api/profile').middleware(middleware.authentication())

