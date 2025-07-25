/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get all immediate card containers
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach((card) => {
    // Locate image (mandatory for cards)
    const img = card.querySelector('img');

    // Try to find a text container
    let textCell = '';
    // Prefer contained text with heading and description, else empty string
    const rel = card.querySelector('.utility-position-relative');
    if (rel) {
      const content = rel.querySelector('.utility-padding-all-2rem') || rel;
      // Only add cell if content has children
      if (content && (content.children.length > 0 || content.textContent.trim())) {
        textCell = content;
      }
    }
    // If no text, textCell stays empty string

    // Only add as a row if an image was found (block spec)
    if (img) {
      cells.push([img, textCell]);
    }
  });

  // If only header, don't replace (avoid empty block)
  if (cells.length === 1) return;

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
