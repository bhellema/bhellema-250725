/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract its main content (image or all content)
  const columnCells = columns.map(col => {
    // If it only contains an image, just use the image element
    const onlyImg = col.querySelector('img');
    if (onlyImg && col.children.length === 1) {
      return onlyImg;
    }
    // Otherwise, reference the whole column
    return col;
  });
  // Build the table: first row = header (one cell), second row = N cells
  const cells = [
    ['Columns (columns7)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
