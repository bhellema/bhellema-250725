/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block info
  const headerRow = ['Cards (cards17)'];

  // Each card: direct child div (with aspect ratio class) that contains an img
  const cardDivs = element.querySelectorAll(':scope > div');

  // For this example, each card contains only an image, no text content, so the text cell is left empty.
  const rows = Array.from(cardDivs).map((div) => {
    const img = div.querySelector('img');
    return [img, ''];
  });

  // Compose the full table: header row, then card rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
