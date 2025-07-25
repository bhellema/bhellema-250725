/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // First column: the image (img element)
  const leftCol = columns.find((col) => col.tagName === 'IMG');
  // Second column: the content (the other child)
  const rightCol = columns.find((col) => col !== leftCol);

  // Table rows: header row (single cell), content row (two cells)
  const cells = [];
  // Header row must be a single cell array
  cells.push(['Columns (columns1)']);
  // Content row: image column and content column
  cells.push([leftCol || '', rightCol || '']);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
