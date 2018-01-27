const fs = require('fs');

function getComponentProps(pathToComponent) {
  const matches = [];
  let componentObject;
  const myRegexp = RegExp('([a-zA-Z]+)\: PropTypes','g');
  try {
    const data = fs.readFileSync(pathToComponent, 'utf8');
    match = myRegexp.exec(data);
    while (match != null) {
      propName = match[1].trim();
      matches.push(propName);
      match = myRegexp.exec(data);
    }
    return matches;
  } catch(e) {
    console.log('Error:', e.stack);
  }
}

module.exports = getComponentProps;
