define([
  'underscore',
	'backbone'
],
function( _, Backbone ) {
  'use strict';

	return Backbone.Model.extend({
		defaults: {
      running: false,
      delay: 400,
      dimension: 50,
      allPatterns: [
        {
          key: 'Empty',
          start: [0, 0],
          value: []
        },
        {
          key: 'R-Pentomino',
          start: [0.5, 0.5],
          value: [[-1, 0], [-1, 1], [0, -1], [0, 0], [1, 0]]
        },
        {
          key: 'Glider',
          start: [0, 0],
          value: [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
        },
        {
          key: 'Glider Gun',
          requiredDimensions: { width: 37, height: 12 },
          start: [0.05, 0.05],
          value: [[4, 0], [4, 1], [5, 0], [5, 1],
                  [2, 12], [2, 13], [3, 11], [4, 10], [5, 10], [6, 10], [7, 11], [8, 12], [8, 13],
                  [5, 14],
                  [3, 15], [4, 16], [5, 16], [5, 17], [6, 16], [7, 15],
                  [1, 22], [2, 20], [2, 21], [3, 20], [3, 21], [4, 20], [4, 21], [5, 22],
                  [0, 24], [1, 24], [5, 24], [6, 24],
                  [2, 34], [2, 35], [3, 34], [3, 35]]
        },
        {
          key: 'Grower',
          start: [0.5, 0.4],
          value: [[0, 6], [1, 4], [1, 6], [1, 7], [2, 4], [2, 6], [3, 4], [4, 2], [5, 0], [5, 2]]
        },
        {
          key: 'Horizontal',
          requiredDimensions: { width: 42, height: 0 },
          start: [0.5, 0.08],
          value: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
                  [0, 9], [0, 10], [0, 11], [0, 12], [0, 13],
                  [0, 17], [0, 18], [0, 19],
                  [0, 26], [0, 27], [0, 28], [0, 29], [0, 30], [0, 31],
                  [0, 33], [0, 34], [0, 35], [0, 36], [0, 37]]
        },
        {
          key: 'Die Hard',
          start: [0.5, 0.4],
          value: [[0, 6], [1, 0], [1, 1], [2, 1], [2, 5], [2, 6], [2, 7]]
        },
        {
          key: 'Acorn',
          start: [0.5, 0.38],
          value: [[0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]]
        }
      ]
    },

    initialize: function() {
      this.maxDelay = 3200;
      this.minDelay = 50;
      this.set('defaultDelay', this.get('delay'));
      // TODO: Review creation of available patterns. It depeneds on field dimension in setAvailablePatterns.
      this.set('availablePatterns', this.get('allPatterns'));
    },

    setDelay: function(delay) {
      if (this._canSetDelay(delay)) {
        this.set('delay', delay);
      }
    },

    increaseSpeed: function() {
      this.setDelay(this.get('delay') / 2);
    },

    decreaseSpeed: function() {
      this.setDelay(this.get('delay') * 2);
    },

    changePattern: function(patternKey) {
      var pattern = _.find(this.get('availablePatterns'), function(p) {
        return p.key === patternKey;
      });
      this.set('pattern', pattern);
    },

    setAvailablePatterns: function(fieldDimensions) {
      var availablePatterns = _.filter(this.get('allPatterns'), function(pattern) {
        if (pattern.requiredDimensions) {
          return pattern.requiredDimensions.width <= fieldDimensions.width &&
                 pattern.requiredDimensions.height <= fieldDimensions.height;
        } else {
          return true;
        }
      });
      this.set('availablePatterns', availablePatterns);
    },

    _canSetDelay: function(delay) {
      return delay >= this.minDelay && delay <= this.maxDelay;
    }
  });
});
