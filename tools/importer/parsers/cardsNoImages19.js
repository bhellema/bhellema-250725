/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block, following the markdown example: 1 column, header 'Cards', 1 row per card
  const rows = [['Cards']];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Each card: get the first <p> (text content)
    const para = cardDiv.querySelector('p');
    if (para) {
      rows.push([para]);
    }
    // If no <p>, skip (should not occur in this block)
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
