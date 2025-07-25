/* global WebImporter */
export default function parse(element, { document }) {
  // According to the markdown example, the header row must be a single cell.
  const headerRow = ['Columns (columns4)'];

  // The images or content divs are in direct children. Each one is a column cell in the second row.
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The second row must have as many cells as there are columns (children of the grid)
  // Each cell should contain the entire column div (including its image/content)
  const contentRow = columns.map(col => col);

  // Compose the table rows: first row is single header cell, second row is n columns.
  const cells = [headerRow, contentRow];

  // Create the table using the provided helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element in the DOM
  element.replaceWith(table);
}
