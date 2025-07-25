/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  // If there are no columns, do nothing
  if (!columns.length) return;

  // The header row must have exactly one column
  const headerRow = ['Columns (columns31)'];
  // The content row contains one cell per column
  const contentRow = columns;

  // Create the table: first row is header (1 col), second row is content (N cols)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
