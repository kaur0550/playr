const app = {
    track: 
     [
      {
        id: 134,
        artist: "Arijit Singh",
        album: "War",
        title: "Ghungroo",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Ghungroo.mp3",
        path: "img/ghungroo.jpg"
      },
      {
        id: 265,
        artist: "Ed Sheeran",
        album: "Shape of You",
        title: "Shape of You",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Shape of You.mp3",
        path: "img/shape.jpg"
      },
      {
        id: 543,
        artist: "Neha Kakkar",
        album: "De De Pyaar De",
        title: "Hauli Hauli",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/HAULI HAULI.mp3",
        path: "img/hauli.jpg"
      },
      {
        id: 476,
        artist: "David Guetta",
        album: "Listen",
        title: "Hey Mama",
        length: 0,
        volume:0.5,
        src: "file:///android_asset/www/media/Hey Mama.mp3",
        path: "img/Hey_Mama.png"
      },
      {
        id: 405,
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

        let div = document.createElement('div');
        let ul = document.createElement('ul');
        let songList = app.track;
        app.tracks = songList.length;

        songList.forEach(element => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');

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
        app.currentTrack = app.currentTrack + 1;
        if(app.currentTrack >= app.tracks){
            app.currentTrack= 0;
            let index = app.currentTrack;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

        let div_currentSong = document.createElement('div');
        let img_currentSong = document.createElement('img');
        let h3_currentSong = document.createElement('h3');
        let p_currentSong = document.createElement('p');

        img_currentSong.setAttribute('src', app.track[index].path);
        img_currentSong.setAttribute('alt', "Poster");
        h3_currentSong.textContent = app.track[index].title;
        p_currentSong.textContent = app.track[index].artist;

        div_currentSong.appendChild(img_currentSong);
        div_currentSong.appendChild(h3_currentSong);
        div_currentSong.appendChild(p_currentSong);

        document.getElementById('song-info').innerHTML = " ";
        document.getElementById('song-info').appendChild(div_currentSong);

        //app.display()

        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }else{
        let index = app.currentTrack;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         
        let div_currentSong = document.createElement('div');
        let img_currentSong = document.createElement('img');
        let h3_currentSong = document.createElement('h3');
        let p_currentSong = document.createElement('p');

        img_currentSong.setAttribute('src', app.track[index].path);
        img_currentSong.setAttribute('alt', "Poster");
        h3_currentSong.textContent = app.track[index].title;
        p_currentSong.textContent = app.track[index].artist;

        div_currentSong.appendChild(img_currentSong);
        div_currentSong.appendChild(h3_currentSong);
        div_currentSong.appendChild(p_currentSong);

        document.getElementById('song-info').innerHTML = " ";
        document.getElementById('song-info').appendChild(div_currentSong);

        //app.display();

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }
    },


    previous: function(){
        app.currentTrack = app.currentTrack - 1;
        if(app.currentTrack < 0 ){
            app.currentTrack= app.tracks - 1;
            let index = app.currentTrack;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         
        let div_currentSong = document.createElement('div');
        let img_currentSong = document.createElement('img');
        let h3_currentSong = document.createElement('h3');
        let p_currentSong = document.createElement('p');

        img_currentSong.setAttribute('src', app.track[index].path);
        img_currentSong.setAttribute('alt', "Poster");
        h3_currentSong.textContent = app.track[index].title;
        p_currentSong.textContent = app.track[index].artist;

        div_currentSong.appendChild(img_currentSong);
        div_currentSong.appendChild(h3_currentSong);
        div_currentSong.appendChild(p_currentSong);

        document.getElementById('song-info').innerHTML = " ";
        document.getElementById('song-info').appendChild(div_currentSong);

        //app.display();

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }else{
        let index = app.currentTrack;
            let src = app.track[index].src;

         if(app.media !== null){
             app.media.release();
             app.media = null;
         }

         
        let div_currentSong = document.createElement('div');
        let img_currentSong = document.createElement('img');
        let h3_currentSong = document.createElement('h3');
        let p_currentSong = document.createElement('p');

        img_currentSong.setAttribute('src', app.track[index].path);
        img_currentSong.setAttribute('alt', "Poster");
        h3_currentSong.textContent = app.track[index].title;
        p_currentSong.textContent = app.track[index].artist;

        div_currentSong.appendChild(img_currentSong);
        div_currentSong.appendChild(h3_currentSong);
        div_currentSong.appendChild(p_currentSong);

        document.getElementById('song-info').innerHTML = " ";
        document.getElementById('song-info').appendChild(div_currentSong);

        //app.display();

         app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();
        }
    },

    // display: function(){
        
    //     let div_currentSong = document.createElement('div');
    //     let img_currentSong = document.createElement('img');
    //     let h3_currentSong = document.createElement('h3');
    //     let p_currentSong = document.createElement('p');

    //     img_currentSong.setAttribute('src', app.track[index].path);
    //     img_currentSong.setAttribute('alt', "Poster");
    //     h3_currentSong.textContent = app.track[index].title;
    //     p_currentSong.textContent = app.track[index].artist;

    //     div_currentSong.appendChild(img_currentSong);
    //     div_currentSong.appendChild(h3_currentSong);
    //     div_currentSong.appendChild(p_currentSong);

    //     document.getElementById('song-info').innerHTML = " ";
    //     document.getElementById('song-info').appendChild(div_currentSong);
    // },

    playTrack: (ev)=>{
        let id = ev.target.getAttribute('data-id');
        
        let found = app.track.find(element=> element.id == id);

        app.currentTrack = app.track.findIndex(element=> element.id == id);

        let src = found.src;

        if(app.media !== null){
            app.media.release();
            app.media = null;
        }

        let div_currentSong = document.createElement('div');
        let img_currentSong = document.createElement('img');
        let h3_currentSong = document.createElement('h3');
        let p_currentSong = document.createElement('p');

        img_currentSong.setAttribute('src', found.path);
        img_currentSong.setAttribute('alt', "Poster");
        h3_currentSong.textContent = found.title;
        p_currentSong.textContent = found.artist;

        div_currentSong.appendChild(img_currentSong);
        div_currentSong.appendChild(h3_currentSong);
        div_currentSong.appendChild(p_currentSong);

        document.getElementById('song-info').innerHTML = " ";
        document.getElementById('song-info').appendChild(div_currentSong);

        app.media = new Media(src, app.ftw, app.wtf, app.statusChange);
        app.play();    
    },

    play: function(){

        document.getElementById('play-btn').classList.remove("show");
        document.getElementById('play-btn').classList.add("hide");
        document.getElementById('pause-btn').classList.remove("hide");
        document.getElementById('pause-btn').classList.add("show");
        document.getElementById('second').classList.remove("hide");
        document.getElementById('second').classList.add("show");
        document.getElementById('visual').classList.remove('hide');
        document.getElementById('visual').classList.add('show');

        app.media.play();
        app.nextsong();

        var mediaTimer = setInterval(function () {
            //get media duration
            var dur = app.media.getDuration();

            let minutes = Math.floor(dur/60);
            let seconds = Math.floor(dur%60);

            let min = minutes.toString().padStart(2,'0');
            let sec = seconds.toString().padStart(2,'0');

            document.getElementById('audio_duration').innerHTML = min+":"+sec;
            
            // get media position
            app.media.getCurrentPosition(
                // success callback
                function (position) {
                    if (position > -1) {
                        let minOfPos = Math.floor(position/60);
                        let secOfPos = Math.floor(position%60);
                        let minOf = minOfPos.toString().padStart(2,'0');
                        let secOf = secOfPos.toString().padStart(2,'0');
                        document.getElementById('audio_position').innerHTML = minOf+":"+secOf;
                    }
                },
                // error callback
                function (e) {
                    console.log("Error happened=" + e);
                }
            );
        }, 1000);
    },

    nextsong: function(){
        let check = setInterval (()=>{
            if(app.stat == 4){
                app.next();
            }
        }, 1000)
    },

    pause: function(){
        document.getElementById('pause-btn').classList.remove('show');
        document.getElementById('pause-btn').classList.add('hide');

        document.getElementById('play-btn').classList.remove('hide');
        document.getElementById('play-btn').classList.add('show');

        document.getElementById('visual').classList.remove('show');
        document.getElementById('visual').classList.add('hide');
        app.media.pause();

        clearInterval(mediaTimer);
        clearInterval(check);
    },

    ff: function(){
        app.media.getCurrentPosition((pos)=>{
            let dur = app.media.getDuration();
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