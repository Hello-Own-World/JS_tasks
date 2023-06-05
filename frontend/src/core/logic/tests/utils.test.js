import { formatHtmlText, clearForm } from '../utils';

describe('formatHtmlText', () => {
  test('replaces escape characters with <br> tag', () => {
    const text = 'Hello\nWorld!';
    const expected = 'Hello<br/>World!';

    const result = formatHtmlText(text);

    expect(result).toBe(expected);
  });

  test('returns empty string if input is empty', () => {
    const text = '';
    const expected = '';

    const result = formatHtmlText(text);

    expect(result).toBe(expected);
  });
});

describe('clearForm', () => {
  test('sets state to empty string for all form fields', () => {
    const setFormFields = {
      field1: jest.fn(),
      field2: jest.fn(),
      field3: jest.fn(),
    };

    clearForm(setFormFields);

    Object.values(setFormFields).forEach((setField) => {
      expect(setField).toHaveBeenCalledWith('');
    });
  });

  test('does nothing if form fields object is empty', () => {
    const setFormFields = {};

    clearForm(setFormFields);

    expect(Object.keys(setFormFields)).toHaveLength(0);
  });
});
