
import ProjectsController from '#controllers/projects_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// router.named({
//     auth: () => import('#middleware/auth_middleware')
// })



router.group(() => {
    router.post('/create-project', [ProjectsController, 'createProject'])

}).prefix('api/projects')