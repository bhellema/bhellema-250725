/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row exactly as in the example
  const rows = [['Accordion']];

  // 2. Get all accordion blocks (immediate children)
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((accordion) => {
    // Extract the title
    let titleElem = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Title: look for any child with paragraph-lg, fallback to direct textContent
      const titleCandidate = toggle.querySelector('.paragraph-lg');
      titleElem = titleCandidate || '';
    }
    // Extract the content (the expanded part)
    let contentElem = '';
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      // Try to use the first .rich-text child, else the direct content
      const rich = nav.querySelector('.rich-text');
      if (rich) {
        contentElem = rich;
      } else {
        // If no .rich-text, use the first div inside nav
        const innerDiv = nav.querySelector('div');
        contentElem = innerDiv || nav;
      }
    }
    // Add row with 2 columns: [title, content]
    rows.push([
      titleElem,
      contentElem
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
