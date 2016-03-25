/*globals  SoundClips, FastClick */

(function(){

    "use strict";

    var $ = window.jQuery;

    // soundclips object
    var soundClips = new SoundClips({
        clips: window.soundClipData,
        path: "./media/sounds"
    });


    /*
     *  hide url bar
     */
    function hideUrlBar() {
        if($('html').scrollTop() > 0 || $('body').scrollTop() > 0) return;
        $('html, body').scrollTop(1);
    }



    /*
     *  prevent image dragging
     */
    function disableImageAndLinkDrag() {
        $('img, a').on('dragstart', function(e) { e.preventDefault(); return false; });
    }



    /*
     *  initialize tap actions
     */
    function initTapActions() {

        // play sound
        $('#soundboard .button[data-clip]').click(function(e) {
            soundClips.play($(this).attr('data-clip'));
        });

        // play random
        $('#soundboard .button.random').click(function(e) {
            soundClips.playRandom();
        });
    }



    /*
     *  dom onload sequence
     */
    function onDomLoad() {

        window.fastclickObj = new FastClick(document.body);
        disableImageAndLinkDrag();
        soundClips.initialize();
        initTapActions();

        // fire blank sound to force load on first tap of screen
        //$(window).one('touchstart', function() {
        //  if(soundsInitialized) return;
        //  initSoundClips();
        //  console.log("sounds: playing blank init sound");
        //  soundClips.play('blank');
        //});
    }



    /*
     *  window onload sequence
     */
    function onWinLoad() {

        // hide url bar
        setTimeout(hideUrlBar, 500);
    }



    $(onDomLoad);
    $(window).load(onWinLoad);


})();

