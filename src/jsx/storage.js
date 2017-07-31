const APP_PREFIX = 'md_';

let data = {};

// if there's saved data in localStorage then load it
const loadedData = localStorage.getItem(APP_PREFIX + 'data');
if (loadedData) {
  data = JSON.parse(loadedData);
}
window.data = data;
window.noSave = false;

function save(name, value) {
  if (!name) {
    data = value;
    return;
  }

  data[name] = value;
}
function load(name) {
  if (Object.keys(data).length === 0 || (name && !data.hasOwnProperty(name))) return false;

  if (!name) return data;

  return data[name];
}

window.addEventListener('beforeunload', function() {
  if (noSave) return;

  // save everything into localStorage
  localStorage.setItem(APP_PREFIX + 'data', JSON.stringify(data));
});

module.exports = { save, load };
