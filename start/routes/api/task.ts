
import TasksController from '#controllers/tasks_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'



router.group(() => {
    router.post('/create-task', [TasksController, 'createTask'])
    router.post('/edit-task-status', [TasksController, 'editTaskStatus'])
    router.post('/edit-task-details', [TasksController, 'editTask'])
    router.post('/edit-task-priority', [TasksController, 'editTaskPriority'])
    router.get('/task-detail', [TasksController, 'getTaskDetail'])
    router.post('/assign-add-or-remove', [TasksController, 'addOrRemoveAssignee'])
    router.post('/delete-task', [TasksController, 'deleteTask'])


}).prefix('api/tasks').use(middleware.authentication())