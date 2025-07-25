/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // The columns are the direct children of the grid
  const columns = Array.from(grid.children);
  // Build the header row as one single cell
  const header = ['Columns (columns9)'];
  // The content row should reference each full column element as a cell (one cell per column)
  const contentRow = columns;
  // Compose the table cells
  const cells = [header, contentRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
