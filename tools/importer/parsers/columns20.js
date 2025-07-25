/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images from the grid
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let imageElements = [];
  if (grid) {
    imageElements = Array.from(grid.querySelectorAll('img'));
  }

  // Extract content from the text/buttons area
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentDiv) {
    contentElements = Array.from(contentDiv.children);
  }

  // Prepare the two columns
  const imagesCell = imageElements.length ? (() => {
    if (imageElements.length === 1) return imageElements[0];
    const wrap = document.createElement('div');
    imageElements.forEach(img => wrap.appendChild(img));
    return wrap;
  })() : '';

  const contentCell = contentElements.length ? (() => {
    if (contentElements.length === 1) return contentElements[0];
    const wrap = document.createElement('div');
    contentElements.forEach(child => wrap.appendChild(child));
    return wrap;
  })() : '';

  // Header row contains exactly one column
  const headerRow = ['Columns (columns20)'];
  const cells = [
    headerRow,
    [imagesCell, contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
