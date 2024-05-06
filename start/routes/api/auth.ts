import router from '@adonisjs/core/services/router'
import UsersController from '../../../app/controllers/users_controller.js'
import { middleware } from '#start/kernel'



router.group(() => {
    router.post('/signup', [UsersController, 'signUp'])
    router.post('/verify-otp', [UsersController, 'verifyOtp'])
    router.post('/resend-otp', [UsersController, 'resendOtp'])
    router.post('/login', [UsersController, 'login'])
}).prefix('api/auth')


router.group(() => {
    router.post('/upload-profile-picture', [UsersController, 'uploadProfilePicture'])
}).prefix('api/profile').middleware(middleware.authentication())