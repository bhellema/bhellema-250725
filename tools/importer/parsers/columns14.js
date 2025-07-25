/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid wrapper that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row (must be a single cell)
  // To ensure the header row spans all columns, we will set the colspan later
  // Create the table
  const cells = [
    ['Columns (columns14)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Make the header <th> span all columns
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', columns.length);
  }
  element.replaceWith(table);
}
