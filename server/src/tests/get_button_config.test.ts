
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type GetButtonConfigInput } from '../schema';
import { getButtonConfig } from '../handlers/get_button_config';

describe('getButtonConfig', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should get button config by id', async () => {
    // Create test button config
    await db.insert(buttonConfigsTable)
      .values({
        config_id: 'test-button-1',
        text: 'Click Me',
        color: '#FF0000',
        action: 'submit'
      })
      .execute();

    const input: GetButtonConfigInput = {
      id: 'test-button-1'
    };

    const result = await getButtonConfig(input);

    expect(result.id).toEqual('test-button-1');
    expect(result.text).toEqual('Click Me');
    expect(result.color).toEqual('#FF0000');
    expect(result.action).toEqual('submit');
  });

  it('should get first button config when no id specified', async () => {
    // Create multiple test button configs
    await db.insert(buttonConfigsTable)
      .values([
        {
          config_id: 'first-button',
          text: 'First Button',
          color: '#00FF00',
          action: 'save'
        },
        {
          config_id: 'second-button',
          text: 'Second Button',
          color: '#0000FF',
          action: null
        }
      ])
      .execute();

    const input: GetButtonConfigInput = {};

    const result = await getButtonConfig(input);

    expect(result.id).toEqual('first-button');
    expect(result.text).toEqual('First Button');
    expect(result.color).toEqual('#00FF00');
    expect(result.action).toEqual('save');
  });

  it('should handle null action field', async () => {
    // Create button config with null action
    await db.insert(buttonConfigsTable)
      .values({
        config_id: 'null-action-button',
        text: 'No Action Button',
        color: '#FFFF00',
        action: null
      })
      .execute();

    const input: GetButtonConfigInput = {
      id: 'null-action-button'
    };

    const result = await getButtonConfig(input);

    expect(result.id).toEqual('null-action-button');
    expect(result.text).toEqual('No Action Button');
    expect(result.color).toEqual('#FFFF00');
    expect(result.action).toBeNull();
  });

  it('should throw error when specific id not found', async () => {
    const input: GetButtonConfigInput = {
      id: 'non-existent-button'
    };

    await expect(getButtonConfig(input)).rejects.toThrow(/Button config with id 'non-existent-button' not found/i);
  });

  it('should throw error when no configs exist', async () => {
    const input: GetButtonConfigInput = {};

    await expect(getButtonConfig(input)).rejects.toThrow(/No button configs found/i);
  });
});
