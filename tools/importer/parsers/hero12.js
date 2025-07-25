/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero12)'];

  // Find background image - the first .grid-layout > div > img.cover-image.utility-position-absolute
  let bgImg = null;
  const grid = element.querySelector('.grid-layout');
  if (grid && grid.children.length > 0) {
    const firstGridChild = grid.children[0];
    bgImg = firstGridChild.querySelector('img.cover-image.utility-position-absolute');
  }

  // Find the content area (title, features, CTA), which is in the second grid column
  let contentCell = null;
  if (grid && grid.children.length > 1) {
    // Card content is in: grid.children[1] (.container) > .card > .card-body > .grid-layout.desktop-3-column
    const cardBody = grid.children[1].querySelector('.card-body');
    if (cardBody) {
      const contentGrid = cardBody.querySelector('.grid-layout');
      if (contentGrid) {
        // There is an image (cover-image.utility-aspect-1x1), and a div with text/cta
        const contentWrapper = document.createElement('div');
        // Feature image
        const featureImg = contentGrid.querySelector('img.cover-image.utility-aspect-1x1');
        if (featureImg) {
          contentWrapper.appendChild(featureImg);
        }
        // Text content and CTA: the first div inside contentGrid
        const textDiv = contentGrid.querySelector('div');
        if (textDiv) {
          contentWrapper.appendChild(textDiv);
        }
        contentCell = contentWrapper.childNodes.length > 0 ? contentWrapper : null;
      }
    }
  }

  // Assemble the table rows
  const cells = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
