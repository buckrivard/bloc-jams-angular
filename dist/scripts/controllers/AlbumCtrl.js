(function() {
    function AlbumCtrl() {
        this.albumData = albumPicasso;
        console.log(this.albumData)
        //for (var i = 0; i < albumData.songs.length; i++) {
        //    this.albumData.push(angular.copy(albumPicasso));
    }
    
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();