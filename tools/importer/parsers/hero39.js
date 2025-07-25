/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per spec
  const headerRow = ['Hero (hero39)'];

  // Find the background image (2nd row)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image as the background
    bgImg = imgCandidates[0];
  }

  // Find the content cell (3rd row): heading, paragraph, CTA (button)
  // Locate the grid cell that contains the heading/text
  let contentCell = [];
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (mainGrid) {
    let textCell = null;
    // Find a direct child that is not the one containing the image
    const children = Array.from(mainGrid.children);
    // The image cell typically contains an img, the text cell does not
    // Or, look for child containing h1
    textCell = children.find(child => child.querySelector('h1'));
    if (textCell) {
      // The main content is in a nested grid (y-bottom)
      const innerGrid = textCell.querySelector('.w-layout-grid.grid-layout');
      if (innerGrid) {
        // h1 heading
        const h1 = innerGrid.querySelector('h1');
        if (h1) contentCell.push(h1);
        // flex-vertical may contain paragraph and button group
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        if (flexVertical) {
          // paragraph
          const p = flexVertical.querySelector('p');
          if (p) contentCell.push(p);
          // button group (contains CTA link)
          const buttonGroup = flexVertical.querySelector('.button-group');
          if (buttonGroup) contentCell.push(buttonGroup);
        }
      } else {
        // If no inner grid, fallback to all content in textCell
        Array.from(textCell.children).forEach(child => {
          if (child.tagName && (child.tagName.startsWith('H') || child.tagName === 'P' || child.querySelector('a'))){
            contentCell.push(child);
          }
        });
      }
    }
  }
  // Fallback: search globally
  if (contentCell.length === 0) {
    const h1 = element.querySelector('h1');
    if (h1) contentCell.push(h1);
    const p = element.querySelector('p');
    if (p && !contentCell.includes(p)) contentCell.push(p);
    const cta = element.querySelector('a');
    if (cta && !contentCell.includes(cta)) contentCell.push(cta);
  }
  // Ensure contentCell is not empty (avoid inserting undefined)
  if (contentCell.length === 0) contentCell = [''];

  // Table: 1 column, 3 rows exactly
  const rows = [
    headerRow,
    [bgImg || ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
