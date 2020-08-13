export const documentTitle = (prefix = '') => {
  let title = prefix ? `${prefix} - ` : '';
  title += 'SyllabusWeave';
  document.title = title;
};
