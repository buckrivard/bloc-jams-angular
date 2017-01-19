(function () {
	function SongPlayer () {
		var SongPlayer = {};
		/**
		* @desc song currently selected
		* @type {Object}
		*/
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
 		/**
		 * @function playSong
		 * @desc calls play buzz method to play music and sets state of currentSong.playing 
		 * @param {boolean} state
		 */
 		var playSong = function() {
 				currentBuzzObject.play();
 				currentSong.playing = true;
 			}

 		/**
		 * @function play 
		 * @desc plays and sets specified song
		 * @param {Object} song
		 */
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(true);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(true);
				}
			} 
		}
		/**
		 * @function pause
		 * @desc pauses a playing song
		 * @param {Object} song
		 */
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