/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table cells array with the block header
  const cells = [['Cards (cards21)']];

  // Find the .card-body within the supplied element
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // No card body, nothing to process
    return;
  }

  // Extract the image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract the heading/title (optional)
  const heading = cardBody.querySelector('.h4-heading');
  // For text cell, follow semantics: heading (bold or heading), then description if present.
  // In the provided HTML, only a heading is present.
  let textCell = '';
  if (heading) {
    // Use the heading element as is, for semantic correctness
    textCell = heading;
  }

  // Add the card row: [image, text cell]
  cells.push([
    img,
    textCell
  ]);

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
