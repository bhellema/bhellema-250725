/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level container for columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    columns = Array.from(grid.children);
  } else {
    // fallback: use direct children if grid-layout is missing
    columns = Array.from(element.children);
  }

  // For each column, collect all child nodes (preserving structure)
  // If no content, add an empty string
  const contentRow = columns.map((col) => {
    // Only include meaningful nodes
    const content = Array.from(col.childNodes).filter((n) => {
      if (n.nodeType === Node.ELEMENT_NODE) return true;
      if (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '') return true;
      return false;
    });
    // If nothing meaningful, return empty string
    if (!content.length) return '';
    return content.length === 1 ? content[0] : content;
  });

  // Compose the block table
  const headerRow = ['Columns (columns3)'];
  const cells = [headerRow, contentRow];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
