import { z } from 'zod';
import { router, publicProcedure } from '../trcp';


// Mock data, if an empty star is required, comment this block of code and uncommet the one bellow
let tasks: any[] = Array.from({ length: 50 }).map((_, i) => ({
  id: (Date.now() + i).toString(),
  title: `Task #${i + 1}`,
  description: `Description for task #${i + 1}`,
  createdAt: new Date(Date.now() - i * 1000 * 60),
}));

// let tasks: any[] = [];

export const taskRouter = router({
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
      })
    )
    .query(({ input }) => {
      const limit = input.limit ?? 10;
      const cursor = input.cursor;
      const sortedTasks = tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      let startIndex = 0;
      if (cursor) {
        const cursorIndex = sortedTasks.findIndex(t => t.id === cursor);
        startIndex = cursorIndex + 1;
      }
      const pagedTasks = sortedTasks.slice(startIndex, startIndex + limit);
      const nextCursor = pagedTasks.length === limit ? pagedTasks[pagedTasks.length - 1].id : null;

      return {
        items: pagedTasks,
        nextCursor,
      };
    }),

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
    const task = tasks.find(searchedTask => searchedTask.id === input.id);
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
