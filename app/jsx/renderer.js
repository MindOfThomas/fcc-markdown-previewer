const marked = require('marked');
let renderer = new marked.Renderer();

renderer.image = function(href, title, text) {
  let html = '<img class="img-responsive" ';

  if (typeof title !== 'undefined') {
    html += 'title="' + title + '" ';
  }

  if (typeof text !== 'undefined') {
    html += 'alt="' + text + '" ';
  }

  html += 'src="' + href + '" />';

  return html;
};

module.exports = renderer;
