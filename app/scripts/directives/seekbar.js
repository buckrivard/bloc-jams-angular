(function() {
	function seekBar($document) {
		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true,
			restrict: 'E',
			scope: {},
			link: function (scope, element, attribute) {
				scope.value = 0;
				scope.max = 100;

				var calculatePercent = function (seekBar, event) {
					var offsetX = event.pageX - seekBar.offset().left;
					var seekBarWidth = seekBar.width();
					var offsetXPercent = offsetX / seekBarWidth;
					offsetXPercent = Math.max(0, offsetXPercent);
					offsetXPercent = Math.min(1, offsetXPercent);
					return offsetXPercent;
				}

				var percentString = function() {
					var value = scope.value;
					var max = scope.max;
					var percent = value / max * 100;
					return percent + "%";
				}

				var seekBar = $(element);

				scope.fillStyle = function () {
					return {width: percentString()};
				};

				scope.thumbStyle = function() {
					return {left: percentString()};
				};

				scope.onClickSeekBar = function (event) {
					var percent = calculatePercent(seekBar, event);
					scope.value = percent * scope.max;
				};

				scope.trackThumb = function() {
					$document.bind('mousemove.thumb', function (event) {
						var percent = calculatePercent(seekBar, event);
						scope.$apply(function() {
							scope.value = percent * scope.max;
						});
					});

					$document.bind('mouseup.thumb', function (event) {
						$document.unbind('mousemove.thumb');
						$document.unbind('mouseup.thumb');
					});
				}
			}
		};
	}

	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar])
})();