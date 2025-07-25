/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs from the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include ALL its content (not just images!)
  // This ensures if a column has text/other elements in the future, they are included
  const cellsRow = columns.map(col => Array.from(col.childNodes).filter(node => {
    // Remove empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  }));

  // Compose the table rows: header and content
  const rows = [
    ['Columns (columns38)'], // header, exactly as in the example
    cellsRow
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with our new table block
  element.replaceWith(table);
}
