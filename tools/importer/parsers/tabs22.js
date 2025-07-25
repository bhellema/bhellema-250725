/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Extract tab labels (real text from HTML, as required by guidelines)
  const tabLabels = tabMenu
    ? Array.from(tabMenu.querySelectorAll('a')).map(a => {
        const div = a.querySelector('div');
        return div ? div.textContent.trim() : a.textContent.trim();
      })
    : [];

  // Extract tab panes (in order)
  const tabPanes = tabContent
    ? Array.from(tabContent.querySelectorAll('.w-tab-pane'))
    : [];

  // Build the table rows
  const rows = [];
  // Header row: single column 'Tabs' (EXACT match)
  rows.push(['Tabs']);
  // Each subsequent row: [Tab Label, Tab Content]
  for (let i = 0; i < Math.max(tabLabels.length, tabPanes.length); i++) {
    // Use label or empty
    const label = tabLabels[i] || '';
    let contentCell = '';
    const pane = tabPanes[i];
    if (pane) {
      // Find grid or use all children
      const grid = Array.from(pane.children).find(child => child.classList.contains('w-layout-grid') || child.classList.contains('grid-layout'));
      contentCell = grid || Array.from(pane.childNodes);
    }
    rows.push([label, contentCell]);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
