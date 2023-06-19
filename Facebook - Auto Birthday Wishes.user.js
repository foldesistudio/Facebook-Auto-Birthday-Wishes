// ==UserScript==
// @name         Facebook - Auto Birthday Wishes
// @name:hu      Facebook - Automatikus születésnap
// @namespace    https://github.com/foldesistudio
// @version      0.51
// @description  Automate birthday greetings on Facebook with ease! This ultimate all-in-one script is short of being a complete FBirthday butler, FB-Day buddy, and wishes automator for FB.
// @description:hu  Születésnapi üdvözleteket automatizáljunk könnyedén!
// @author       Földesi Mihály (FoldesiStudio.hu)
// @match        https://m.facebook.com/events/calendar/birthdays*
// @icon         https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico
// @downloadURL
// @updateURL
// @homepageURL         https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes
// @supportURL          https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes/issues
// @grant        none
// ==/UserScript==
(function() {
	'use strict';

	function clickAllbDays() {
		// A névvágás alapjának meghatározása
		let splitNamePart = ' ';
		// Első '._55wo._55x2._56bf' div kiválasztása
		const bDayCards = document.querySelectorAll('div._55wo._55x2._56bf:not(:empty):has(form)');
		// Textarea elemek kiválasztása
		const textareas = document.querySelectorAll('textarea._5whq.input._52jc');

		if (bDayCards) {
			// Nevek kiválasztása az első bDayCard-ban
			const bDayCardLinks = bDayCards[0].querySelectorAll('._55ws._2vyq > a');
			bDayCardLinks.forEach((link, index) => { // Bday kártyákon való iteráció
				setTimeout(() => {
					// A textarea elem kiválasztása ciklikus módon
					const textarea = link.nextElementSibling.querySelector('textarea._5whq');
					if (textarea) {
						// Az elem rendelkezik textarea elemmel, folytasd a feldolgozást
						const nameElement = link.querySelector('p._52jh._5at0._592p');
						const name = nameElement.textContent.trim();
						// Név feldarabolása 'splitNamePart' alapján
						const parts = name.split(splitNamePart);

						// Keresztnév
						const truncatedFirstName = parts[0].trim();

						// Az üzenet szövege
						const message = `${truncatedFirstName}, boldog születésnapot kívánok! 🍰`;

						// Az üzenet hozzáadása a textarea tartalmához
						textarea.value += '\n' + message;

						// Input esemény kiváltása
						textarea.dispatchEvent(new Event('input', {
							bubbles: true
						}));

						// Change esemény kiváltása
						textarea.dispatchEvent(new Event('change', {
							bubbles: true
						}));

						// Konzolüzenet
						console.log(message);

						// Időzítés beállítása a sor sorszámától függően
						if (index === bDayCardLinks.length - 1) {
							// Utolsó elem esetén végrehajtjuk a gombnyomást
							postButtonClick();
						}

					}

				}, 5555 * index);
			});
		}
	}




	function postButtonClick() {
		// Küldés - "Post" gomb kiválasztása és kattintás minden elemnél külön-külön
		const postButtons = document.querySelectorAll('button[type="submit"]');

		postButtons.forEach((button, index) => {
			setTimeout(() => {
				button.click();
				console.log('Gombnyomás végrehajtva');
				if (index === postButtons.length - 1) {
					// Utolsó gombnyomás után vége a folyamatnak
					console.log('Az összes gombnyomás végrehajtva');
                    alert("Mindenki fel lett köszöntve!");
				}
			}, 5555 * index); // Módosíthatod az időzítést igényeid szerint
		});
	}

	clickAllbDays();

})();