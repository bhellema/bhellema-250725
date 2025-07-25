/* global WebImporter */
export default function parse(element, { document }) {
  // The relevant block is inside .container > .grid-layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // LEFT COLUMN: anchor with image, tag, heading, paragraph
  const leftCard = grid.querySelector('a.utility-link-content-block');

  // RIGHT COLUMNS (vertical stack of cards):
  // First flex-horizontal: two image cards
  // Second flex-horizontal: a vertical stack of text cards and dividers
  // We want to group all right content as a single column
  const flexRows = grid.querySelectorAll(':scope > .flex-horizontal');
  const rightColContent = [];

  if (flexRows.length > 0) {
    // first flex-horizontal: image cards (anchors)
    const imageCards = flexRows[0].querySelectorAll('a.utility-link-content-block');
    imageCards.forEach(card => {
      rightColContent.push(card);
    });
  }
  if (flexRows.length > 1) {
    const textCardsAndDividers = flexRows[1].children;
    Array.from(textCardsAndDividers).forEach(child => {
      // Only add anchors (the cards)
      if (child.tagName === 'A') {
        rightColContent.push(child);
      }
    });
  }

  // Build table: header row followed by a single row with two columns (left, right)
  const tableData = [
    ['Columns (columns2)'],
    [leftCard, rightColContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
