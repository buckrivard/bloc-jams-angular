(function () {
	function SongPlayer ($rootScope, Fixtures) {
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
 			
    		currentBuzzObject.bind('timeupdate', function() {
    			$rootScope.$apply(function () {
    				SongPlayer.currentTime = currentBuzzObject.getTime();    
    			});
    		})

    		SongPlayer.currentSong = song;
 		};
 		/**
		 * @function playSong
		 * @desc plays selected song
		 * @param {object} song
		 */
 		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
 			};
 		/**
		* @function stopSong
		* @desc stops selected song
		* @param {object} song
		*/
 		var stopSong = function(song) {
 			//if (!song) {
 			//	throw "invalid song";
 			//} here to debug caller
 			//if (currentBuzzObject) {
	 			currentBuzzObject.stop(); 				
 			//}
	 		song.playing = null;
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
 		* @desc volume level
 		* @type {number}
 		*/
 		SongPlayer.volume = 80;

 		var oldVolume = null;
		/**
		* @desc song currently selected
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		/**
		 * @desc Current playback time (in seconds) of currently playing song
		 * @type {Number}
		 */
		SongPlayer.currentTime = null;
 		/**
		 * @function play 
		 * @desc plays and sets specified song
		 * @param {Object} song
		 */
		SongPlayer.play = function(song) {
			console.log(song, SongPlayer.currentSong);
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
			console.log(song, SongPlayer.currentSong);
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
     		song.playing = false;
		}
		/**
		* @function previous
		* @desc sets song to previous song in album, or stops music if called on first song of album
		*/
		SongPlayer.previous = function() {
			console.log(song, SongPlayer.currentSong);
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		/**
		* @function next
		* @desc plays the next song
		*/
		SongPlayer.next = function() {
			console.log(song, SongPlayer.currentSong);
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		/**
		* @function SetVolume
		* @desc changes the volume
		* @param {Number} volume
		*/
		SongPlayer.setVolume = function(volume) {
			if (currentBuzzObject) {
				currentBuzzObject.setVolume(volume);
			}
		};
		/**
		* @function setCurrentTime
		* @desc sets the current time in the playing song
		* @param {number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};
		
		SongPlayer.mute = function() {

		}
		return SongPlayer;
	};

angular
	.module('blocJams')
	.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();