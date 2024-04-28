
import PhasesController from '#controllers/phases_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'




router.group(() => {
    router.post('/create-project-phase', [PhasesController, 'createProjectPhase'])
   

}).prefix('api/phases').use(middleware.authentication())