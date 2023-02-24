/* Change escape characters with HTML <br> tag for proper rendering on page
Requires dangerouslySetInnerHTML property in HTML tag */
export function formatHtmlText(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}

/** Takes obj with setState functions, iterates through all keys and
 * sets state to empty string */
export function clearForm(setFormFields) {
  Object.values(setFormFields).forEach((setField) => {
    setField('');
  });
}
