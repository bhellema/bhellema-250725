/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the direct children of the grid
  const gridCols = Array.from(grid.children);

  // Find the image child (right column)
  let imgEl = gridCols.find(child => child.tagName === 'IMG');

  // For the left cell, gather everything except the image
  const leftCols = gridCols.filter(child => child !== imgEl);
  // Create a container to hold the left side content, referencing the actual elements
  const leftCell = document.createElement('div');
  leftCols.forEach(col => leftCell.appendChild(col));

  // Compose the header row as a SINGLE cell (this fixes the issue)
  const headerRow = ['Columns (columns18)'];
  // Compose the content row: left content, right image (if present)
  const contentRow = imgEl ? [leftCell, imgEl] : [leftCell];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
