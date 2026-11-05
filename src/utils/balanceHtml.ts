/**
 * Bulletproof HTML tag balancer.
 * Ensures all opened HTML tags inside post/article content are properly closed
 * and any orphan closing tags are stripped, preventing layout leaks into grid sidebars.
 * Also respects HTML5 block vs phrasing rules so errant </p> tags never prematurely
 * terminate parent <div> containers or question cards.
 */
export function balanceHtml(html: string): string {
  if (!html) return '';

  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  const blockElements = new Set([
    'address', 'article', 'aside', 'blockquote', 'details', 'dialog', 'div',
    'dl', 'dt', 'dd', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'main',
    'nav', 'ol', 'p', 'pre', 'section', 'table', 'tbody', 'td', 'tfoot',
    'th', 'thead', 'tr', 'ul'
  ]);

  const inlineElements = new Set([
    'a', 'b', 'i', 'strong', 'em', 'span', 'code', 'mark', 'small', 'sub', 'sup', 'u', 's', 'label', 'q'
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
      // Find matching tag in stack
      const stackIndex = stack.lastIndexOf(tagName);
      if (stackIndex !== -1) {
        // Check if there are block elements between stackIndex and top of stack.
        // Phrasing/inline tags or <p> tags MUST NEVER close an intervening block tag (e.g. <div>).
        const hasInterveningBlock = (inlineElements.has(tagName) || tagName === 'p') &&
          stack.slice(stackIndex + 1).some(t => t !== 'p' && blockElements.has(t));

        if (hasInterveningBlock) {
          // Orphan or misplaced closing tag inside a block - ignore it
          continue;
        }

        while (stack.length > stackIndex) {
          const popped = stack.pop()!;
          result += `</${popped}>`;
        }
      } else {
        // Orphan closing tag - omit
        continue;
      }
    } else {
      // Opening tag: if it's a block element (and not <p>), implicitly close any dangling <p> on stack
      if (blockElements.has(tagName) && tagName !== 'p') {
        const pIndex = stack.lastIndexOf('p');
        if (pIndex !== -1 && stack.slice(pIndex + 1).every(t => inlineElements.has(t))) {
          while (stack.length > pIndex) {
            const popped = stack.pop()!;
            result += `</${popped}>`;
          }
        }
      }

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
