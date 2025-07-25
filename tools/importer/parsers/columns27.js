/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;
  // Get all immediate children of the grid (should be two columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Reference existing elements for both columns
  const col1 = cols[0]; // text and cta
  const col2 = cols[1]; // image

  // Compose table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [col1, col2];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
