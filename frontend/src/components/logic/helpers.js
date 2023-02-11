export function formatHtmlText(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}
