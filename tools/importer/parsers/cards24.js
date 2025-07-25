/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches the example
  const headerRow = ['Cards (cards24)'];
  // Collect all card <a> blocks directly under the grid
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  const rows = cards.map(card => {
    // First cell: the image (take image element directly)
    let imageEl = null;
    const imgWrapper = card.querySelector(':scope > div');
    if (imgWrapper) {
      imageEl = imgWrapper.querySelector('img');
    }
    // Second cell: text content (tag, date, title)
    // We'll combine the tag/date (which is in a flex row) and title (h3) in a div
    const parts = [];
    const tagDate = card.querySelector('.flex-horizontal');
    if (tagDate) parts.push(tagDate);
    const heading = card.querySelector('h3');
    if (heading) parts.push(heading);
    // If no tag/date or heading, cell should still exist but be empty
    const rightCell = parts.length === 1 ? parts[0] : (parts.length ? parts : '');
    return [imageEl, rightCell];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
