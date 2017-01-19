(function () {
	function SongPlayer () {
		var SongPlayer = {};

		var currentSong = null;
		 /**
 		* @desc Buzz object audio file
 		* @type {Object}
 		*/
		var currentBuzzObject = null;
		 /**
		 * @function setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 */
		var setSong = function(song) {
    		if (currentBuzzObject) {
        		currentBuzzObject.stop();
    		}

    		if (currentSong) {
        		currentSong.playing = null;  			
    		}
 
            if (song) {
	    		currentBuzzObject = new buzz.sound(song.audioUrl, {
	        		formats: ['mp3'],
	        		preload: true
	    		});            	
            } else {
            	currentBuzzObject = null;
            }
 
    		currentSong = song;
 		};


		SongPlayer.play = function(song) {
			if (!song) {
				setSong(song);
			} else if (currentSong !== song) {

				setSong(song);
				currentBuzzObject.play();
				currentSong.playing = true;

			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
					currentSong.playing = true;
				}
			} 
		}
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		}
		return SongPlayer;
	};

angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer);
})();