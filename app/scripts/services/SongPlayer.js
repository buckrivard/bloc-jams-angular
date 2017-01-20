(function () {
	function SongPlayer (Fixtures) {
		var SongPlayer = {};
		/**
		* @desc retrieves album data from Fixtures
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
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
        		SongPlayer.currentSong.playing = null;
    		}

    		currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
    		});            	
 
    		SongPlayer.currentSong = song;
 		};
 		/**
		 * @function playSong
		 * @desc calls play buzz method to play music and sets state of SongPlayer.currentSong.playing 
		 * @param {boolean} state
		 */
 		var playSong = function(song) {
 				currentBuzzObject.play();
 				song.playing = true;
 			}
		
		/**
		* @function getSongIndex
		* @desc gets index of currently playing song
		* @param {object} song 
		*/
 		var getSongIndex = function(song) {
 			return currentAlbum.songs.indexOf(song);
 		};

		/**
		* @desc song currently selected
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
 		/**
		 * @function play 
		 * @desc plays and sets specified song
		 * @param {Object} song
		 */
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			} 
		}
		/**
		 * @function pause
		 * @desc pauses a playing song
		 * @param {Object} song
		 */
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
     		song.playing = false;
		}
		/**
		* @function
		* @desc sets song to previous song in album, or stops music if called on first song of album
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		return SongPlayer;
	};

angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer);
})();