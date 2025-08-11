import cron from 'node-cron';
import { todoServices } from '../services/todo.service';

export const scheduleTodoCron = (): void => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Running daily expired todos completion task...');
    try {
      const updatedCount = await todoServices.markExpiredTodosAsCompleted();
      console.log(`[CRON] Marked ${updatedCount} expired todos as completed.`);
    } catch (error) {
      console.error('[CRON] Error updating expired todos:', error);
    }
  });
};
