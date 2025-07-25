/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the header/container
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  const grid = mainContainer.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the cells array according to the requirements:
  // The header row must be a single cell (one column)
  // The second row must have as many columns as needed
  const cells = [];
  cells.push(['Columns (columns15)']); // header row: one column only
  cells.push(columns); // second row: as many columns as present

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
