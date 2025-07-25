/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-sm.y-top');
  if (!grid) return;

  // Find all cards (utility-link-content-block) in this grid, including nested (not direct child only)
  const cards = Array.from(grid.querySelectorAll('.utility-link-content-block'));

  const cells = [];
  // Block header: match example
  cells.push(['Cards (cards37)']);

  cards.forEach(card => {
    // Image: always in a child div with .utility-aspect-... and inside it an <img>
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }

    // Text content: for some cards it's inside a .utility-padding-all-2rem, otherwise direct children
    const textWrapper = card.querySelector('.utility-padding-all-2rem') || card;

    // Get heading (h3 or h4)
    const heading = textWrapper.querySelector('h3, h4');
    // Get first paragraph
    const para = textWrapper.querySelector('p');
    // Get call-to-action button if present (e.g. .button)
    const cta = textWrapper.querySelector('.button');

    // Compose text cell parts, order: heading, para, cta (all as references)
    const textParts = [];
    if (heading) textParts.push(heading);
    if (para) textParts.push(para);
    if (cta) textParts.push(cta);

    // Table row: [image, text stack]
    cells.push([
      img ? img : '',
      textParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
