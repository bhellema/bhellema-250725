/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as a single cell
  const headerRow = ['Table (striped, bordered)'];

  // The subheader and all data rows must have two columns
  const subHeaderRow = ['Question', 'Answer'];

  // Collect all FAQ rows
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const question = grid.querySelector('.h4-heading');
      const answer = grid.querySelector('.rich-text');
      // Reference elements directly
      rows.push([
        question || document.createTextNode(''),
        answer || document.createTextNode('')
      ]);
    }
  });

  // Table structure: first row is single column (header), all others are 2 columns
  const cells = [headerRow];
  // For the subheader and all data rows, make sure they are arrays of length 2
  cells.push(subHeaderRow);
  for (const row of rows) {
    // Defensive: if row is not length 2, pad it
    if (row.length === 2) {
      cells.push(row);
    } else {
      cells.push([row[0] || '', row[1] || '']);
    }
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}