
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type GetButtonConfigInput, type ButtonConfig } from '../schema';
import { eq } from 'drizzle-orm';

export const getButtonConfig = async (input: GetButtonConfigInput): Promise<ButtonConfig> => {
  try {
    // Build the base query
    const baseQuery = db.select().from(buttonConfigsTable);

    // Execute with or without filter
    const results = input.id
      ? await baseQuery.where(eq(buttonConfigsTable.config_id, input.id)).execute()
      : await baseQuery.execute();

    // If no ID specified, return first config found
    // If ID specified but not found, this will throw an error
    if (results.length === 0) {
      throw new Error(input.id ? `Button config with id '${input.id}' not found` : 'No button configs found');
    }

    const config = results[0];
    
    return {
      id: config.config_id,
      text: config.text,
      color: config.color,
      action: config.action,
    };
  } catch (error) {
    console.error('Get button config failed:', error);
    throw error;
  }
};
