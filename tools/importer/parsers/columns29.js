/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the cells for the content row: each column gets its image or its content
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // The header row must be a single cell only
  const headerRow = ['Columns (columns29)'];

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
