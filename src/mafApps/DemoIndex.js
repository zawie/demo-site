import "mafs/index.css";
let Components = {};
Components['projectileMotion'] = require('./projectileMotion').default;
Components['electricField'] = require('./electricField').default;
Components['threeBodyGravity'] = require('./threeBodyGravity.tsx').default;

export default Components
