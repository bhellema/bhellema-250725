/* global WebImporter */
export default function parse(element, { document }) {
  // Check for the main container
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the main 2-column grid
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: headline, subheading, buttons
  const leftCol = columns[0];
  const leftCellContent = [];
  // Heading (h1)
  const heading = leftCol.querySelector('h1');
  if (heading) leftCellContent.push(heading);
  // Subheading (p)
  const subheading = leftCol.querySelector('p');
  if (subheading) leftCellContent.push(subheading);
  // Button group (all buttons as a group)
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // RIGHT COLUMN: image group
  const rightCol = columns[1];
  let rightCellContent = [];
  // Get the grid of images inside rightCol
  const imagesGrid = rightCol.querySelector('.grid-layout');
  if (imagesGrid) {
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    rightCellContent = imgs;
  } else {
    // Fallback: any img in rightCol
    rightCellContent = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose the table rows for columns block
  const cells = [
    ['Columns (columns36)'],
    [leftCellContent, rightCellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
