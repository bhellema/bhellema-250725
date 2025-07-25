/* global WebImporter */
export default function parse(element, { document }) {
  // Header as in the example
  const headerRow = ['Cards (cards10)'];

  // Find all top-level card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = [headerRow];

  cardLinks.forEach(card => {
    // Image cell: find the first <img> in card (in .utility-aspect-3x2)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text cell construction
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textCellContent = [];

    if (textContainer) {
      // Tags: all <div class="tag"> inside .tag-group
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        const tags = Array.from(tagGroup.querySelectorAll('.tag'));
        textCellContent.push(...tags);
      }
      // Heading: h3 or .h4-heading
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      // Paragraph: p or .paragraph-sm
      const para = textContainer.querySelector('p, .paragraph-sm');
      if (para) textCellContent.push(para);
    }

    rows.push([
      img,
      textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
