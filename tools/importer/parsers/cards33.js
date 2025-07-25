/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];
  // Each card is an <a> directly inside the grid
  const cardLinks = element.querySelectorAll(':scope > a');
  cardLinks.forEach(card => {
    // First img in the card (should always exist)
    const img = card.querySelector('img');
    // Content container is the div after the img
    let contentDiv = img ? img.nextElementSibling : null;
    let textCellContent = [];
    if (contentDiv) {
      // Get all children nodes to preserve full content and order
      // Include ALL children (tags and textNodes)
      textCellContent = Array.from(contentDiv.childNodes).filter(
        node => {
          // Exclude empty text
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent.trim().length > 0;
          }
          return true;
        }
      );
    }
    // Only add if both image and text content exist
    if (img && textCellContent.length) {
      rows.push([
        img,
        textCellContent.length === 1 ? textCellContent[0] : textCellContent
      ]);
    }
  });
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
