import { router } from '../trcp';
import { taskRouter } from './tasks';

export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
