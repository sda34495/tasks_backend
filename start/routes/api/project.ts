
import ProjectsController from '#controllers/projects_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

// router.named({
//     auth: () => import('#middleware/auth_middleware')
// })



router.group(() => {
    router.post('/create-project', [ProjectsController, 'createProject'])
    router.get('/all-projects', [ProjectsController, 'getAllProjects'])
    router.post('/delete-project', [ProjectsController, 'deleteProject'])
    router.post('/edit-project', [ProjectsController, 'editProject'])

}).prefix('api/projects').use(middleware.authentication())