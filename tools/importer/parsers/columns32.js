/* global WebImporter */
export default function parse(element, { document }) {
  // Look for the grid with columns inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const cols = Array.from(grid.children);

  // Build the Columns (columns32) block table
  const headerRow = ['Columns (columns32)'];
  const contentRow = cols.map((col) => col);
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the section with the new table
  element.replaceWith(table);
}
