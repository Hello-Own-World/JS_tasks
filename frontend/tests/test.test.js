import { formatHtmlText } from '../src/core/logic/utils';

test('Format new lines to <br>', () => {
  expect(formatHtmlText('\n')).toBe('<br/>');
});
