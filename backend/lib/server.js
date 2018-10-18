"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var PORT = 4000;
app.get('/', function (req, res) {
  res.send('Hello GraphQL');
});
app.listen(PORT, function () {
  console.log("Express server running on port ".concat(PORT));
});
