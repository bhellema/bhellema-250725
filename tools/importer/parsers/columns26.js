/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the first .w-layout-grid inside the container (the outer grid)
  const outerGrid = container.querySelector('.w-layout-grid');
  if (!outerGrid) return;

  // The columns in this layout are the direct children of the outer grid
  const colElements = Array.from(outerGrid.children);

  // Defensive: Should have at least two columns (left: heading/paragraph, right: testimonial grid)
  if (colElements.length < 2) return;

  // left column: heading and paragraph stack
  const leftCol = document.createElement('div');
  // Both are <p> elements at the top level inside the grid
  for (const child of colElements) {
    if (child.matches('p')) {
      leftCol.appendChild(child);
    }
  }
  // Only include if we found any paragraphs
  if (leftCol.childNodes.length === 0) return;

  // right column: the nested grid (testimonial grid)
  // Find the nested grid as a child of outerGrid
  let rightCol = null;
  for (const child of colElements) {
    if (
      child.classList.contains('w-layout-grid') &&
      child !== outerGrid
    ) {
      rightCol = child;
      break;
    }
  }
  // If not found, try the last child (defensive, may be grid)
  if (!rightCol && colElements[colElements.length - 1].classList.contains('w-layout-grid')) {
    rightCol = colElements[colElements.length - 1];
  }
  // If still not found, fallback to the last child
  if (!rightCol) {
    rightCol = colElements[colElements.length - 1];
  }

  // Create the block table
  const cells = [
    ['Columns (columns26)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
