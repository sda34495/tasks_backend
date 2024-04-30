
import TasksController from '#controllers/tasks_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'



router.group(() => {
    router.post('/create-task', [TasksController, 'createTask'])


}).prefix('api/tasks').use(middleware.authentication())