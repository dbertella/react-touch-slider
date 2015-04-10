'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var TestReactApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TestReactApp = require('components/TestReactApp.js');
    component = React.createElement(TestReactApp);
  });

  it('should create a new instance of TestReactApp', function () {
    expect(component).toBeDefined();
  });
});
