/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match example exactly
  const headerRow = ['Hero (hero6)'];

  // === Row 2: Background Image ===
  // Find the grid-layout (first-level child div)
  const grid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let bgImg = null;
  if (grid) {
    // The image will be in the first direct child (usually a div)
    const bgDiv = grid.children[0];
    if (bgDiv) {
      bgImg = bgDiv.querySelector('img');
    }
  }

  // === Row 3: Content (title, subtitle, CTAs) ===
  // Card is in the 2nd column of the grid
  let contentCellContent = [];
  if (grid && grid.children.length > 1) {
    // Drill into the 2nd column structure
    const contentGrid = grid.children[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // The card is within the inner grid
      const card = contentGrid.querySelector('.card');
      if (card) {
        // Heading (h1)
        const h1 = card.querySelector('h1');
        if (h1) contentCellContent.push(h1);
        // Subheading (p.subheading)
        const subheading = card.querySelector('p.subheading');
        if (subheading) contentCellContent.push(subheading);
        // Button group (optional)
        const btnGroup = card.querySelector('.button-group');
        if (btnGroup) {
          // Add all buttons (anchor elements)
          const btns = Array.from(btnGroup.querySelectorAll('a'));
          if (btns.length) contentCellContent.push(...btns);
        }
      }
    }
  }

  // Edge case: If nothing extracted, ensure empty cell
  if (contentCellContent.length === 0) contentCellContent = [''];
  const cells = [
    headerRow,
    [bgImg || ''],
    [contentCellContent]
  ];
  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
