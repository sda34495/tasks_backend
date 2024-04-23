import router from '@adonisjs/core/services/router'
import UsersController from '../../../app/controllers/users_controller.js'



router.group(() => {
    router.post('/signup', [UsersController, 'signUp'])
    router.post('/verify-otp', [UsersController, 'verifyOtp'])
    router.post('/resend-otp', [UsersController, 'resendOtp'])
    router.post('/login', [UsersController, 'login'])
}).prefix('api/auth')