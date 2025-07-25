/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Gather all grid items (each carousel slide)
  const slides = Array.from(grid.children);

  // Prepare table rows: each slide = [image, '']
  const rows = slides.map(slide => {
    const img = slide.querySelector('img');
    return [img || '', ''];
  });

  // The header row must have exactly one cell, matching the example
  const cells = [
    ['Carousel'], // Header: exactly one column
    ...rows      // Each row: two columns (image, empty)
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
