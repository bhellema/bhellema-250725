/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // If there are no columns, do not replace anything
  if (!columns.length) return;

  // Prepare the header row with the exact block name/variant
  const headerRow = ['Columns (columns30)'];

  // Compose the cells row with the actual referenced elements from the DOM
  const cellsRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the original section element with the new table
  element.replaceWith(table);
}
