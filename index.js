var musicArr = [
    {name: 'Paint', path: './musics/hua.mp3', artist: 'Gloria Tang Tsz-kei', img: './musics/dzq.jpg'},
    {name: 'Journey', path: './musics/Journey.mp3', artist: 'Capozio', img: './musics/capozio.jpg'},
    {name: 'AmazingMountain', path: './musics/miracle.mp3', artist: 'Masaaki Kishibe', img: './musics/abzm.jpg'}

];

window.onload = function () {//当页面加载的时候，这个函数就会起作用
    var local_list = document.getElementById('local-list');
    var str = '';
    for (var i = 0; i < musicArr.length; i++) {
        //` es6新特性 如果需要进行字符串拼接的时候，我们可以通过"+"拼接，但是比较麻烦，es6新特性可方便的进行多个字符串的拼接
        //` 把你要拼接de内容放在里面即可，不需要额外的"+"辅助
        str += `<li class="music-item" onclick='play(this,${i})'>
        <span class="music-name">${musicArr[i].name}</span>
        <audio src="${musicArr[i].path}"></audio>`;
    }

    local_list.innerHTML = str;//local-list的后面追加内容
}

function showControl() {
    document.getElementById('control').style.display = 'block';
}

function hideControl() {
    document.getElementById('control').style.display = 'none';
}

var playNow = null;

var currentIndex = null;
function play(ele, i) {//ele指的是music-item，i指的是哪个音乐
    if (playNow) {//歌正在播放
        if (playNow == ele.lastChild) {//这些子歌正在播放
            if (playNow.paused) {//歌没有在播放
                playNow.play();//系统函数
                ele.classList.add('music-active');//先获取DOM对象，然后通过classList.add()和classList.remove()即可添加类型和删除类名 music-active是css的一个动态渲染
            } else {////歌在播放
                ele.classList.remove('music-active');
                playNow.pause();
            }
        } else {//这些子歌不在播放，但是要选择这些子歌中的某一首
            playNow.parentNode.classList.remove('music-active');//把当前正在播放的歌停掉
            playNow.pause();
            playNow.currentTime = 0;//
            playNow = ele.lastChild;
            ele. classList.add('music-active');
            playNow.play();
        }
        currentIndex = i;//记录正在播放哪首歌
    }


    else {
        playNow = ele.lastChild;
        ele.classList.add('music-active');
        playNow.play();
        currentIndex = 0;
    }
    changeControlImg();


}

function playAPause() {
    if (playNow) {
        if (playNow.paused) {
            playNow.parentNode.classList.add('music-active');
            playNow.play();
        } else {
            playNow.parentNode.classList.remove('music-active');
            playNow.pause();
        }
    } else {
        playNow = document.getElementsByClassName('music-item')[0].lastChild;
        playNow.parentNode.classList.add('music-active');
        playNow.play();
    }
    changeControlImg();

}

function changeControlImg() {
    if (playNow) {
        if (playNow.paused) {
            document.getElementById('control-img-play').style.backgroundImage = 'url("./imgs/icon/play.png")';
            document.getElementsByClassName('album-img')[0].classList.remove('spin');
        } else {
            document.getElementById('control-img-play').style.backgroundImage = 'url("./imgs/icon/paused.png")';
            document.getElementsByClassName('album-img')[0].classList.add('spin');
        }
    } else {
        document.getElementsByClassName('album-img')[0].classList.remove('spin');
        document.getElementById('control-img-play').style.backgroundImage = 'url("./imgs/icon/play.png")';
    }
}

function prev() {
    if (currentIndex == 0) {
        currentIndex = musicArr.length - 1;
    } else {
        currentIndex--;
    }
    var ele = document.getElementsByClassName('music-item')[currentIndex];
    play(ele, currentIndex);
    updateInfo(currentIndex);
}

function next() {
    if (currentIndex == musicArr.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    var ele = document.getElementsByClassName('music-item')[currentIndex];
    play(ele, currentIndex);

}