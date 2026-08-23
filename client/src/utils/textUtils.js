export function cleanText(text) {
  if (!text) {
    return "";
  }

  return text.replace(/<[^>]*>/g, "");
}