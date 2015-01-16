(function(){
  'use strict';

  angular.module('ngPanels')

    .factory('ngPanels', function(Config, $http) {
      var panelGroup = {
        panels: [],
        setPanels: function(panels) {
          var self = this;
          self.panels = panels;

          angular.forEach(self.panels, function(panel, panelName) {
            if (!angular.isFunction(panel.unmask)) {
              panel.unmask = function() {
                angular.forEach(self.panels, function(panel, panelName) {
                  if (angular.isArray(panel.masks) && panel.masks.indexOf(panelName)) {
                    self.close(panelName);
                  }
                });
                self.unmask(panelName);
              };
            }
          });
          return this;
        },
        get: function(panel) {
          return this.panels[panel];
        },
        open: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            if (angular.isArray(self.panels[panel].masks)) {
              self.mask(self.panels[panel].masks);
            }
            self.panels[panel].active = true;
            self.panels[panel].masked = false;
          });
          return this;
        },
        close: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].active = false;
            self.panels[panel].masked = false;
            if (angular.isArray(self.panels[panel].masks)) {
              self.unmask(self.panels[panel].masks);
            }
          });
          return this;
        },
        mask: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = true;
            self.panels[panel].active = true;
          });
          return this;
        },
        unmask: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = false;
          });
          return this;
        },
        only: function(panels) {
          var self = this;
          if (!angular.isArray(panels)) {
            panels = [panels];
          }

          angular.forEach(self.panels, function(panel) {
            panel.active = false;
            panel.masked = false;
          });

          angular.forEach(panels, function(panel) {
            self.panels[panel].masked = false;
          });
          return this;
        },
        none: function() {
          var self = this;
          angular.forEach(self.panels, function(panel) {
            panel.active = false;
            panel.masked = false;
          });
          return this;
        }
      };

      return {
        panelGroups: [],
        newGroup: function(groupName, panels) {
          if (!angular.isDefined(this.panelGroups[groupName])) {
            this.panelGroups[groupName] = angular.copy(panelGroup);
            if (panels) {
              this.panelGroups[groupName].setPanels(panels);
            }
          }

          return this.panelGroups[groupName];
        }
      };
    });
})();
