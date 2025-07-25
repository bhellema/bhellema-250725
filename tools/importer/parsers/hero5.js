/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header Row
  const headerRow = ['Hero (hero5)'];
  
  // 2. Find the immediate direct grid (contains image and content)
  const mainGrid = element.querySelector(':scope > .w-layout-grid');

  // 3. Find the image: only consider images that are direct children of mainGrid
  let image = null;
  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > *');
    for (const child of gridChildren) {
      if (child.tagName === 'IMG') {
        image = child;
        break;
      }
    }
  }
  const imageRow = [image ? image : ''];

  // 4. Find text/content: look for a child grid/container in mainGrid with <h2>
  let textContainer = null;
  if (mainGrid) {
    const possibleContainers = mainGrid.querySelectorAll(':scope > div, :scope > section');
    for (const container of possibleContainers) {
      if (container.querySelector('h2')) {
        textContainer = container;
        break;
      }
    }
  }

  // 5. Gather content elements: heading, rich text, and CTA buttons (if any)
  let textElements = [];
  if (textContainer) {
    const heading = textContainer.querySelector('h2');
    if (heading) textElements.push(heading);
    // Find the rich text (paragraph)
    const richText = textContainer.querySelector('.rich-text, .w-richtext');
    if (richText) textElements.push(richText);
    // Find button group (contains CTAs)
    const buttonGroup = textContainer.querySelector('.button-group');
    if (buttonGroup) textElements.push(buttonGroup);
  }
  const textRow = [textElements.length ? textElements : ''];

  // 6. Construct and replace
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
