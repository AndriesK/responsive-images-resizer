const resizer = require('../../index');

resizer('./input', './output', [1920, 1080, 480])
  .then(() => {
    console.log('Done!');
  })
  .catch(err => {
    console.log('Error:', err);
  });
