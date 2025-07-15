import { z } from 'zod';
import { router, publicProcedure } from '../trcp';

let tasks: any[] = [];

export const taskRouter = router({
  list: publicProcedure.query(() => tasks),

  create: publicProcedure.input(
    z.object({
      title: z.string().min(1),
      description: z.string().optional(),
    })
  ).mutation(({ input }) => {
    const newTask = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description ?? '',
      createdAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
  }),

  update: publicProcedure.input(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      description: z.string().optional(),
    })
  ).mutation(({ input }) => {
    const task = tasks.find(t => t.id === input.id);
    if (!task) throw new Error('Task not found');
    task.title = input.title;
    task.description = input.description ?? '';
    return task;
  }),

  delete: publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    tasks = tasks.filter(task => task.id !== input.id);
    return { success: true };
  }),

});
