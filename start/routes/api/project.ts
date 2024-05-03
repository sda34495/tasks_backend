
import ProjectsController from '#controllers/projects_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'



router.group(() => {
    router.post('/create-project', [ProjectsController, 'createProject'])
    router.get('/all-projects', [ProjectsController, 'getAllProjects'])
    router.get('/project-detail', [ProjectsController, 'getProjectDetail'])
    router.post('/delete-project', [ProjectsController, 'deleteProject'])
    router.post('/edit-project', [ProjectsController, 'editProject'])
    router.post('/assign-project', [ProjectsController, 'assignProject'])
    router.get('/get-invitation-detail', [ProjectsController, 'getInvitationDetail'])
    router.post('/send-invite', [ProjectsController, 'inviteToProject'])

}).prefix('api/projects').use(middleware.authentication())