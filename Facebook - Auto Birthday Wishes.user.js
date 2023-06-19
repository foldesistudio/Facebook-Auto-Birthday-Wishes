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
// @downloadURL https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes/raw/main/Facebook%20-%20Auto%20Birthday%20Wishes.user.js
// @updateURL https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes/raw/main/Facebook%20-%20Auto%20Birthday%20Wishes.user.js
// @homepageURL         https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes
// @supportURL          https://github.com/foldesistudio/Facebook-Auto-Birthday-Wishes/issues
// @grant        none
// ==/UserScript==
(function() {
	'use strict';

	function clickAllbDays() {
		// HU: A névvágás alapjának meghatározása
		// EN: Determination of the basis for name-cutting
		let splitNamePart = ' ';
		// HU: Első '._55wo._55x2._56bf' div kiválasztása
		// EN: Select first '._55wo._55x2._56bf' div
		const bDayCards = document.querySelectorAll('div._55wo._55x2._56bf:not(:empty):has(form)');
		// HU: Textarea elemek kiválasztása
		// EN: Selecting textarea elements
		const textareas = document.querySelectorAll('textarea._5whq.input._52jc');

		if (bDayCards) {
			// HU: Nevek kiválasztása az első bDayCard-ban
			// EN: Selection of names in the first bDayCard
			const bDayCardLinks = bDayCards[0].querySelectorAll('._55ws._2vyq > a');
			// HU: Bday kártyákon való iteráció | EN: Iteration on Bday cards
			// EN: Iteration on Bday cards
			bDayCardLinks.forEach((link, index) => { 
				setTimeout(() => {
					// HU: A textarea elem kiválasztása ciklikus módon
					// EN: Selecting a textarea element in a cyclical way
					const textarea = link.nextElementSibling.querySelector('textarea._5whq');
					if (textarea) {
						// HU: Az elem rendelkezik textarea elemmel? Ha igen, folytasd a feldolgozást!
						// EN: Does the element have a textarea element? 
						const nameElement = link.querySelector('p._52jh._5at0._592p');
						const name = nameElement.textContent.trim();
						// Név feldarabolása 'splitNamePart' alapján
						const parts = name.split(splitNamePart);

						// HU: Keresztnév
						// EN: First name
						const truncatedFirstName = parts[0].trim();

						// HU: Az üzenet szövege
						// EN: Text of the message
						const message = `Happy Birthday, ${truncatedFirstName}! 🍰`;

						// HU: Az üzenet hozzáadása a textarea tartalmához
						// EN: Add the message to the textarea content
						textarea.value += '\n' + message;

						// HU: Input esemény kiváltása
						// EN: Trigger an input event
						textarea.dispatchEvent(new Event('input', {
							bubbles: true
						}));

						// HU: Change esemény kiváltása
						// EN: Trigger a Change event
						textarea.dispatchEvent(new Event('change', {
							bubbles: true
						}));

						// HU: Konzolüzenet
						// EN: Console message
						console.log(message);

						// HU: Időzítés beállítása a sor sorszámától függően
						// EN: Set timing depending on the line number
						if (index === bDayCardLinks.length - 1) {
							// HU: Utolsó elem esetén végrehajtjuk a gombnyomást
							// EN: For the last item, we will perform the button press
							postButtonClick();
						}

					}

				}, 5555 * index);
			});
		}
	}




	function postButtonClick() {
		// HU: Küldés - "Post" gomb kiválasztása és kattintás minden elemnél külön-külön
		// EN: Send - Select "Post" button and click on each item separately
		const postButtons = document.querySelectorAll('button[type="submit"]');

		postButtons.forEach((button, index) => {
			setTimeout(() => {
				button.click();
				console.log('Button press executed');
				if (index === postButtons.length - 1) {
					// HU: Utolsó gombnyomás után vége a folyamatnak
					// EN: After the last button press, the process is over
					console.log('All button presses completed!');
                    alert("Wishes has just sent to everyone!");
				}
			}, 5555 * index); // Módosíthatod az időzítést igényeid szerint
		});
	}

	clickAllbDays();

})();
