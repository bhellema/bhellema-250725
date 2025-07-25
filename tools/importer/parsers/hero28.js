/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block, matching the example exactly
  const headerRow = ['Hero (hero28)'];

  // Find the immediate .grid-layout grid for structure
  const grid = element.querySelector('.grid-layout');

  // 1. Extract background image (row 2)
  let bgImg = null;
  if (grid && grid.children.length > 0) {
    // The first column typically contains the background image
    const firstCol = grid.children[0];
    if (firstCol) {
      // Look for the first img inside this column
      bgImg = firstCol.querySelector('img');
    }
  }
  if (!bgImg) {
    // Fallback: any img within the header
    bgImg = element.querySelector('img');
  }
  // If not found, cell will be blank

  // 2. Extract content area (row 3)
  let textContentCell = '';
  if (grid && grid.children.length > 1) {
    // The second column typically contains the text (title, etc)
    const textCol = grid.children[1];
    if (textCol) {
      textContentCell = textCol;
    }
  }

  // Compose the block table
  const cells = [
    headerRow,
    [bgImg || ''],
    [textContentCell || ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
