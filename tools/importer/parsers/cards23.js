/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];
  // Each tab content section can have cards
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Each tabPane has a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a>
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // --- IMAGE CELL ---
      // Try to find an image, typically in a .utility-aspect-3x2 or .utility-margin-bottom-1rem
      let img = null;
      const imgWrap = card.querySelector('.utility-aspect-3x2, .utility-margin-bottom-1rem');
      if (imgWrap) {
        img = imgWrap.querySelector('img');
      }
      // --- TEXT CELL ---
      // Title is usually an h3 with class .h4-heading
      const title = card.querySelector('h3');
      // Description is usually .paragraph-sm
      const desc = card.querySelector('.paragraph-sm');
      // Compose the text cell, only push elements that exist
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // Add the card row (always 2 columns, image and text)
      cells.push([
        img || '',
        textCell.length > 0 ? textCell : ''
      ]);
    });
  });
  // Create block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
