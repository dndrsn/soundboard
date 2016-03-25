/*globals  Howl */

(function() {

	"use strict";


	/*
	 *  sound clips object
	 */
	window.SoundClips = function(config) {

		var self = this;

		//props
		this.config = config;
		this.initialized = false;
		this.sounds = {};


		// initialize individual sound
		var initSound = function(clipID) {

			var soundExt = {
				mp4: '.m4a' //,
				//mp3: '.mp3',
				//ogg: '.ogg',
				//wav: '.wav',
			};
			var soundUrls = [];
			for(var type in soundExt) {
				soundUrls.push(self.config.path + '/' + clipID + soundExt[type]);
			}


			var sound = new Howl({
				urls: soundUrls,
				onload: function() {
					console.log('soundClips: loaded clip ' + clipID);
					this.initialized = true;
				}
			});
			return sound;
		};

		// initialization
		this.initialize = function() {

			var clipID;

			for(clipID in this.config.clips) {
				this.sounds[clipID] = initSound(clipID);
			}
			this.initialized = true;
			return this;
		};

		// play sound
		this.play = function(clipID) {

			var sound = this.sounds[clipID];

			if(!sound.initialized) {
				console.log('soundClips: (re)initializing sound - ' + clipID);
				this.sounds[clipID] = initSound(clipID);
			}
			console.log("sounds: playing clip - " + clipID);
			sound/*.stop()*/.play();
			return this;
		};

		// play random sound
		this.playRandom = function() {
			var clipIDs = Object.keys(this.sounds);
			var randomClipID = clipIDs[Math.floor(Math.random() * clipIDs.length)];
			this.play(randomClipID);
			return this;
		};

		// stop sound
		this.stop = function(clipID) {
			console.log("sounds: stopping clip - " + clipID);
			this.sounds[clipID].stop();
			return this;
		};

	};

})();

