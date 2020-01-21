const app = {
    track: 
     [
      {
        id: 1,
        artist: "Arijit Singh, Shilpa Rao",
        album: "War",
        title: "Ghungroo",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Ghungroo.mp3",
        path: "img/ghungroo.jpg"
      },
      {
        id: 2,
        artist: "Ed Sheeran",
        album: "Shape of You",
        title: "Shape of You",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Shape of You.mp3",
        path: "img/shape.jpg"
      },
      {
        id: 3,
        artist: "Neha Kakkar, Garry Sandhu",
        album: "De De Pyaar De",
        title: "Hauli Hauli",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/HAULI HAULI.mp3",
        path: "img/hauli.jpg"
      },
      {
        id: 4,
        artist: "David Guetta",
        album: "Listen",
        title: "Hey Mama",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Hey Mama.mp3",
        path: "img/Hey_Mama.png"
      },
      {
        id: 5,
        artist: "Macklemore",
        album: "The Heist",
        title: "Can t Hold Us",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Can t Hold Us.mp3",
        path: "img/Can't_Hold_Us.png"
      }
    ],

    media:null,

    currentTrack : null,

    tracks: null,

    stat: null,

    status:{
        '0':'MEDIA_NONE',
        '1':'MEDIA_STARTING',
        '2':'MEDIA_RUNNING',
        '3':'MEDIA_PAUSED',
        '4':'MEDIA_STOPPED'
    },

    err:{
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED'
    },

    init: function() {
        document.addEventListener('deviceready', app.ready, false);
    },

    ready: function() {
        console.log('here');

        let div = document.createElement('div');
        let ul = document.createElement('ul');
        let songList = app.track;
        console.log(songList.length);
        app.tracks = songList.length;

        songList.forEach(element => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');

            console.log(element.path);

            img.setAttribute('src', element.path);
            img.setAttribute('alt', "Poster");
            img.setAttribute('data-id', element.id);
            h3.textContent = element.title;
            h3.setAttribute('data-id', element.id);
            p.textContent = element.artist;
            p.setAttribute('data-id', element.id);
            li.setAttribute('data-id', element.id);
            
            li.appendChild(img);
            li.appendChild(h3);
            li.appendChild(p);

            ul.appendChild(li);
        });
        document.getElementById('songs').appendChild(ul);

        app.addListeners();
    },

    ftw: function(){
        //success creating the media object and playing, stopping, or recording
        console.log('success doing something');
        //app.media.play();
    },

    wtf: function(err){
        //failure of playback of media object
        console.warn('failure');
        console.error(err);
    },

    statusChange: function(status){
        app.stat = status;
        console.log('media status is now ' + app.status[status] );
    },

    addListeners: function(){
        
        let songArea = document.getElementById('songs');
        songArea.addEventListener('click', app.playTrack);

         document.querySelector('#play-btn').addEventListener('click', app.play);
        // document.querySelector('#play-btn').addEventListener('click', app.play);
         document.querySelector('#pause-btn').addEventListener('click', app.pause);
         document.querySelector('#ff-btn').addEventListener('click', app.ff);
         document.querySelector('#rew-btn').addEventListener('click', app.rew);
         document.querySelector('#nxt-btn').addEventListener('click', app.next);
         document.querySelector('#prv-btn').addEventListener('click', app.previous);
        document.addEventListener('pause', ()=>{
            app.media.release();
        });
        document.addEventListener('menubutton', ()=>{
            console.log('clicked the menu button');
        });
        document.addEventListener('resume', ()=>{
            app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        })
    },

    next: function(){
        console.log(app.currentTrack);
        console.log(app.tracks);
        app.currentTrack = app.currentTrack + 1;
        if(app.currentTrack > app.tracks){
            app.currentTrack= 1;

            let item = app.currentTrack;

            let index = item -1;
            let src = app.track[index].src;
        // //let src = found.src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);

            console.log(item);
            app.play();
        }else{
        let item = app.currentTrack;
        console.log(item);
        let index = item -1;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }
    },


    previous: function(){
        console.log(app.currentTrack);
        console.log(app.tracks);
        app.currentTrack = app.currentTrack - 1;
        if(app.currentTrack <= 0 ){
            app.currentTrack= app.tracks;

            let item = app.currentTrack;

            let index = item -1;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);

            console.log(item);
            app.play();
        }else{
        let item = app.currentTrack;
        console.log(item);
        let index = item -1;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }
    },

    playTrack: (ev)=>{
        let id = ev.target.getAttribute('data-id');
        
        console.log(id);
        
        let found = app.track.find(element=> element.id == id);
        
        app.currentTrack = found.id;

        console.log(app.currentTrack);
        let src = found.src;

        if(app.media !== null){
            app.media.release();
            app.media = null;
        }

        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        
        //app.nextsong();
        app.play();    
    },

    play: function(){
        app.media.play();

        app.nextsong();


        var counter = 0;
        var timerDur = setInterval(function() {
            counter = counter + 100;
            if (counter > 2000) {
                clearInterval(timerDur);
            }
            var dur = app.media.getDuration();
            if (dur > 0) {
                clearInterval(timerDur);

                let minutes = Math.floor(dur/60);
                let seconds = dur-minutes*60;
                let min = minutes.toFixed(2);
                let sec = seconds.toFixed(2);

                document.getElementById('audio_duration').innerHTML = minutes+":"+sec;

            }
        }, 100);

        var mediaTimer = setInterval(function () {
            // get media position
            app.media.getCurrentPosition(
                // success callback
                function (position) {
                    if (position > -1) {
                        let minOfPos = Math.floor(position/60);
                        let secOfPos = position-minOfPos*60;
                        let secOf = secOfPos.toFixed(2);
                        //let positionInSec = position.toFixed(2);
                        document.getElementById('audio_position').innerHTML = minOfPos+":"+secOf;
                    }
                },
                // error callback
                function (e) {
                    console.log("Error getting pos=" + e);
                }
            );
        }, 1000);

        //console.log(duration);
    },

    nextsong: function(){

        console.log(app.stat);
        console.log("hi");
        let check = setInterval (()=>{
            console.log(app.stat);
            if(app.stat == 4){
                app.next();

            }

            }, 1000)

    },

    pause: function(){
        app.media.pause();
    },

    ff: function(){
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            pos += 10;
            if(pos < dur){
                app.media.seekTo( pos * 1000 );
            }
        });
    },
    
    rew: function(){
        app.media.getCurrentPosition((pos)=>{
            pos -= 10;
            if( pos > 0){
                app.media.seekTo( pos * 1000 );
            }else{
                app.media.seekTo(0);
            }
        });
    }
}

let ready = ('cordova' in window)?"deviceready":"DOMContentLoaded";
document.addEventListener(ready, app.init);