/* eslint-disable */
const EventEmitter = require('events').EventEmitter;
const httpMocks = require('node-mocks-http');

module.exports = {
  createRequest: httpMocks.createRequest.bind(httpMocks),
  createResponse(opts) {
    opts = opts || {};
    opts.eventEmitter = EventEmitter;

    const res = httpMocks.createResponse(opts);

    const emit = res.emit;
    res.emit = (evt) => {
      if (evt === 'end') {
        const data = res._getData();
        emit.call(res, 'end', data);
      } else {
        emit.apply(res, arguments);
      }
    };

    const end = res.end;
    res.end = () => {
      const args = arguments;
      process.nextTick(() => {
        end.apply(res, args);
      });
    };

    const json = res.json;
    res.json = () => {
      json.apply(res, arguments);
      res._isJSON = true;
      res.end();
    };

    const redirect = res.redirect;
    res.redirect = () => {
      redirect.apply(res, arguments);
      res.end();
    };

    return res;
  },
};
