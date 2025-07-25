/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example exactly
  const headerRow = ['Columns (columns11)'];

  // Get the main two-column grid (top row)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftContent = null;
  let rightContent = null;
  if (mainGrid) {
    // Reference the two main columns
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    if (gridChildren.length >= 2) {
      leftContent = gridChildren[0];
      rightContent = gridChildren[1];
    }
  }

  // Get the lower two-column grid of images (second row)
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCol1 = null, imgCol2 = null;
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    if (imageDivs.length >= 2) {
      const img1 = imageDivs[0].querySelector('img');
      const img2 = imageDivs[1].querySelector('img');
      imgCol1 = img1;
      imgCol2 = img2;
    }
  }

  // Compose table rows: header, first row (main content), second row (images)
  // Only add a row if both columns are found, to avoid empty cells
  const rows = [headerRow];
  if (leftContent && rightContent) rows.push([leftContent, rightContent]);
  if (imgCol1 && imgCol2) rows.push([imgCol1, imgCol2]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
