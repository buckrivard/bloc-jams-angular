(function() {
    function Fixtures() {
        var Fixtures = {};

		var sunlitYouth = {
		    title: 'Sunlit Youth',
		    artist: 'Local Natives',
		    label: 'Cubism',
		    year: '2016',
		    albumArtUrl: '/assets/images/album_covers/22.png',
		    songs: [
		        { title: 'Villainy', duration: 223, audioUrl: 'assets/music/Villainy' },
		        { title: 'Past Lives', duration: 223, audioUrl: 'assets/music/Past Lives' },
		        { title: 'Dark Days', duration: 181, audioUrl: 'assets/music/Dark Days' },
		        { title: 'Fountain of Youth', duration: 233, audioUrl: 'assets/music/Fountain of Youth' },
		        { title: 'Masters', duration: 265, audioUrl: 'assets/music/Masters' }
		    ]
		 };

		var albumMarconi = {
		    title: 'The Telephone',
		    artist: 'Guglielmo Marconi',
		    label: 'EM',
		    year: '1909',
		    albumArtUrl: '/assets/images/album_covers/20.png',
		    songs: [
		         {title: 'Hello, Operator?', duration: '1:01' },
		         {title: 'Ring, ring, ring', duration: '5:01' },
		         {title: 'Fits in your pocket', duration: '3:21'},
		         {title: 'Can you hear me now?', duration: '3:14'},
		         {title: 'Wrong phone number', duration: '2:15'}
		     ]
		 };

		 Fixtures.getAlbum = function() {
		 	return sunlitYouth;
		 };

		 Fixtures.getCollection = function (numberOfAlbums) {
		 	var albums = [];
		 	for (var i = 0; i < numberOfAlbums; i++) {
            albums.push(sunlitYouth);
        	}
        	return albums;
		 }

        return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures);
})();

