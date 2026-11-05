/**
 * Bulletproof HTML tag balancer.
 * Ensures all opened HTML tags inside post/article content are properly closed
 * and any orphan closing tags are stripped, preventing layout leaks into grid sidebars.
 */
export function balanceHtml(html: string): string {
  if (!html) return '';

  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  const tagRegex = /<\/?([a-zA-Z0-9]+)(\s+[^>]*?)?(\/?)>/g;
  
  const stack: string[] = [];
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html)) !== null) {
    const [fullTag, rawTagName, , selfClosingSlash] = match;
    const tagName = rawTagName.toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = selfClosingSlash === '/' || voidElements.has(tagName);

    result += html.substring(lastIndex, match.index);
    lastIndex = tagRegex.lastIndex;

    if (isSelfClosing) {
      result += fullTag;
      continue;
    }

    if (isClosing) {
      const stackIndex = stack.lastIndexOf(tagName);
      if (stackIndex !== -1) {
        while (stack.length > stackIndex) {
          const popped = stack.pop()!;
          result += `</${popped}>`;
        }
      } else {
        // Orphan closing tag - omit to prevent breaking outer DOM containers
        continue;
      }
    } else {
      stack.push(tagName);
      result += fullTag;
    }
  }

  result += html.substring(lastIndex);

  while (stack.length > 0) {
    const popped = stack.pop()!;
    result += `</${popped}>`;
  }

  return result;
}
