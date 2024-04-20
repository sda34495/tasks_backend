/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '../app/controllers/users_controller.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('auth/signup', [UsersController, 'signUp'])