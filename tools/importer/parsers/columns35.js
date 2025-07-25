/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get columns (immediate children of grid)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table: header row is only one cell, second row is the columns
  const cells = [
    ['Columns (columns35)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
