    var head;
    var max_retry = 2000;
    var whichDivtoEdit;
    var whichAlgouse;
    var AlgoforDecrypt;
    var EncryptedText;
    
    // Check if Gmail UI frame is ready 
    function isGmailUIFrame(doc) {
        try {
            return document.getElementsByClassName('aic').length > 0;
        } catch (e) {
            return false;
        }
    }
 
    // Loop to check if the Gmail UI is loaded
    var waitForGmailToLoad = function() {
        var top_frame, canvas_frame;
        try {
            top_frame = window.top.document;
            if (top_frame.getElementById('canvas_frame')) {
            }
        } catch (e) {}
        top_frame = window.document;
 
        if(top_frame && isGmailUIFrame(top_frame)) 
        {
            head = top_frame;
            // Gmail UI is loaded: insert the script elements
            // createjqueryScriptElement(head);
            //adjustUI(head);
            //triggerclick(head);
            getstared();
            // addcryptana();

            return head;
        }
        else{
            max_retry = max_retry -1;
            if(max_retry > 0)
                window.setTimeout(waitForGmailToLoad, 500);
        }
        return (head !== undefined);
    };


    //lets us know that script worked !!!
    function getstared () {
		  console.log("Extension installed");
		  createjqueryScriptElement(head);

	}

	//injects Jquery
	function createjqueryScriptElement(head){
		var jqueryscript = document.createElement('script');
		jqueryscript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
		head.body.appendChild(jqueryscript);
		console.log(head+" script added");
		adjustUI(head);
	}

	//changes the UI accordingly
	//trigger this on changes 
	function adjustUI(head){
		// document.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.background = "white";
		// document.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.color = "red";

		head.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.background = "#FF4040";
		head.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.color = "#B8E64B";
		console.log("UI adjusted");
		triggerAim(head);
		triggerclick(head);
		triggerRep(head);
	}
	
	//trigger on inbox,sentmail,drafts
	function triggerAim(head){
		var aimButtons = head.getElementsByClassName('aim');
		for (var i = aimButtons.length - 1; i >= 0; i--) {
			aimButtons[i].onmouseup = function(){
				console.log("clicked on sidebar");
				setTimeout(function(){triggerRep(head);}, 1000);	
			}
		};
	}

	// trigger compose mail button programatically
	function triggerclick(head){

		// var evt1 = head.createEvent("MouseEvents");
		// var evt2 = head.createEvent("MouseEvents");
		
		// evt1.initMouseEvent("mousedown", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
		// evt2.initMouseEvent("mouseup", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);

		// composebutton[0].dispatchEvent(evt1);
		// composebutton[0].dispatchEvent(evt2);


		var composebutton = head.getElementsByClassName('T-I J-J5-Ji T-I-KE L3');

		for (var i = composebutton.length - 1; i >= 0; i--) {
			composebutton[i].onmousedown = function(){
				// console.log("d");
			};

			composebutton[i].onmouseup = function(){
				// console.log("u");
				$(".tableCell").remove();
				setTimeout(function(){addcryptana();}, 1000);
			};

		};
		console.log("triggerclick");
	}

	function triggerRep(head){
		var message_bar = head.getElementsByClassName('zA yO');

		for (var i = message_bar.length - 1; i >= 0; i--) {
			message_bar[i].onmousedown = function(){

			}

			message_bar[i].onmouseup = function(){
				console.log(this.id+" clicked on message");
				setTimeout(function(){addcryptana_Replybar();}, 1000);	
			}

		};
	}

	//search for reply/reply-All/forward
	function searchReplybutton(){
		try {
            return document.getElementsByClassName('ams').length > 0;
        } catch (e) {
            return false;
        }
	}

	//add function to reply-bar-buttons
	var addcryptana_Replybar = function(){
		var peek;
		if(searchReplybutton()){
			check_forCryptana();
			clearTimeout(peek);
			console.log(document.getElementsByClassName('ams').length+" rep buttons");
			//add listeners for reply/ reply-all/ forward
			var rep_Buttons = document.getElementsByClassName('ams');
			for (var i = rep_Buttons.length - 1; i >= 0; i--) {
				rep_Buttons[i].onmousedown = function(){

				}

				rep_Buttons[i].onmouseup = function(){
					console.log(this.id+" clicked on reply bar");
					// remove all encrypt buttons and then add
					$(".tableCell").remove();
					setTimeout(function(){addEncrypt_Replybar();}, 600);
				}
			};


		}else{
			peek = setTimeout(function(){addcryptana_Replybar();}, 500);
		}
	}

	var check_forCryptana = function(){
		var email_bodies = document.getElementsByClassName('adP');
		console.log(email_bodies.length+" visible emails");
		for (var i = email_bodies.length - 1; i >= 0; i--) {
			email_bodies[i]
			var pre_text = $(email_bodies[i]).find('.a3s');
			var almost_there_text_div = pre_text[0].firstChild;
			var innertext = almost_there_text_div.innerText;
			if(isCryptanaUsed(innertext)){
				// add div
				var decryptbutton = document.createElement('div');
				decryptbutton.className = "decrypter-button";
				decryptbutton.innerHTML = innertext;
				//emptying whats there !!!
				almost_there_text_div.innerHTML = "";
				almost_there_text_div.appendChild(decryptbutton);
			}
		};
		//adding decrypting backend !!!
		$('.decrypter-button').click(function(){
			var buttoninfo = this.innerHTML;
			AlgoforDecrypt = buttoninfo.substring(8,9);
    		EncryptedText = buttoninfo.substring(10);

    		showDecrypted();
    	});
	}

	function hex2ascii(hexx){
          var hex = hexx.toString();//force conversion
          var str = '';
          for (var i = 0; i < hex.length; i += 2)
              str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          return str;		
	}

	function showDecrypted(){
    		//prompt password overlay !!!
    		var password_container = document.createElement('div');
			password_container.className ="password-container";
			var password_input = document.createElement('input');
			password_input.className = "password-input";
			password_input.type = "password";
			password_input.placeholder ="Enter key to Decrypt, press Enter";
			password_input.id ="passKEY";
			password_container.appendChild(password_input);
			document.body.appendChild(password_container);
			var passkee="";

			$('.password-input').keyup(function (e){
				if (e.keyCode == 13){
					passkee= document.getElementById('passKEY').value;
					$('.password-container').remove();
					switch(AlgoforDecrypt){
							case "1" :
								$('.post-decrypt').remove();
								var post_Decrypt_container = document.createElement('div');
								post_Decrypt_container.className = "post-decrypt";
								post_Decrypt_container.innerHTML ="Decrpted Text";

								var post_Decrypt_close = document.createElement('div');
								post_Decrypt_close.className = "post-decrypt-close";
								post_Decrypt_close.innerHTML = "X";

								var post_Decrypt_content = document.createElement('div');
								post_Decrypt_content.className = "post-decrypt-content";
								post_Decrypt_content.innerHTML = CryptoJS.RC4.decrypt(EncryptedText, passkee);
								post_Decrypt_content.innerHTML = hex2ascii(post_Decrypt_content.innerHTML);
								console.log("Decrypted text is "+post_Decrypt_content.innerHTML);

								post_Decrypt_container.appendChild(post_Decrypt_close);
								post_Decrypt_container.appendChild(post_Decrypt_content);

								document.body.appendChild(post_Decrypt_container);

								$('.post-decrypt-close').click(function(){
									$('.post-decrypt').remove();
								});
								break;

							case "2" :
								var post_Decrypt_container = document.createElement('div');
								post_Decrypt_container.className = "post-decrypt";
								post_Decrypt_container.innerHTML ="Decrpted Text";

								var post_Decrypt_close = document.createElement('div');
								post_Decrypt_close.className = "post-decrypt-close";
								post_Decrypt_close.innerHTML = "X";

								var post_Decrypt_content = document.createElement('div');
								post_Decrypt_content.className = "post-decrypt-content";
								post_Decrypt_content.innerHTML = CryptoJS.Rabbit.decrypt(EncryptedText, passkee);
								post_Decrypt_content.innerHTML = hex2ascii(post_Decrypt_content.innerHTML);
								console.log("Decrypted text is "+post_Decrypt_content.innerHTML);


								post_Decrypt_container.appendChild(post_Decrypt_close);
								post_Decrypt_container.appendChild(post_Decrypt_content);

								document.body.appendChild(post_Decrypt_container);
								$('.post-decrypt-close').click(function(){
									$('.post-decrypt').remove();
								});
								break;
							
							
							case "3" :
								var post_Decrypt_container = document.createElement('div');
								post_Decrypt_container.className = "post-decrypt";
								post_Decrypt_container.innerHTML ="Decrpted Text";

								var post_Decrypt_close = document.createElement('div');
								post_Decrypt_close.className = "post-decrypt-close";
								post_Decrypt_close.innerHTML = "X";

								var post_Decrypt_content = document.createElement('div');
								post_Decrypt_content.className = "post-decrypt-content";
								post_Decrypt_content.innerHTML = CryptoJS.TripleDES.decrypt(EncryptedText, passkee);
								post_Decrypt_content.innerHTML = hex2ascii(post_Decrypt_content.innerHTML);
								console.log("Decrypted text is "+post_Decrypt_content.innerHTML);


								post_Decrypt_container.appendChild(post_Decrypt_close);
								post_Decrypt_container.appendChild(post_Decrypt_content);

								document.body.appendChild(post_Decrypt_container);
								$('.post-decrypt-close').click(function(){
									$('.post-decrypt').remove();
								});
								break;
							
							
							case "4" :
								var post_Decrypt_container = document.createElement('div');
								post_Decrypt_container.className = "post-decrypt";
								post_Decrypt_container.innerHTML ="Decrpted Text";

								var post_Decrypt_close = document.createElement('div');
								post_Decrypt_close.className = "post-decrypt-close";
								post_Decrypt_close.innerHTML = "X";

								var post_Decrypt_content = document.createElement('div');
								post_Decrypt_content.className = "post-decrypt-content";
								post_Decrypt_content.innerHTML = CryptoJS.DES.decrypt(EncryptedText, passkee);
								post_Decrypt_content.innerHTML = hex2ascii(post_Decrypt_content.innerHTML);
								console.log("Decrypted text is "+post_Decrypt_content.innerHTML);


								post_Decrypt_container.appendChild(post_Decrypt_close);
								post_Decrypt_container.appendChild(post_Decrypt_content);

								document.body.appendChild(post_Decrypt_container);
								$('.post-decrypt-close').click(function(){
									$('.post-decrypt').remove();
								});
								break;
							
							
							case "5" :
								var post_Decrypt_container = document.createElement('div');
								post_Decrypt_container.className = "post-decrypt";
								post_Decrypt_container.innerHTML ="Decrpted Text";

								var post_Decrypt_close = document.createElement('div');
								post_Decrypt_close.className = "post-decrypt-close";
								post_Decrypt_close.innerHTML = "X";

								var post_Decrypt_content = document.createElement('div');
								post_Decrypt_content.className = "post-decrypt-content";
								post_Decrypt_content.innerHTML = CryptoJS.AES.decrypt(EncryptedText, passkee);
								post_Decrypt_content.innerHTML = hex2ascii(post_Decrypt_content.innerHTML);
								console.log("Decrypted text is "+post_Decrypt_content.innerHTML);


								post_Decrypt_container.appendChild(post_Decrypt_close);
								post_Decrypt_container.appendChild(post_Decrypt_content);

								document.body.appendChild(post_Decrypt_container);
								$('.post-decrypt-close').click(function(){
									$('.post-decrypt').remove();
								});

								break;


					}
				}			
			});
	}

	function isCryptanaUsed(innertext){
		if(innertext.substring(0,7)=="Decrypt")
			return true;
		else
			return false;
	}

	var addEncrypt_Replybar = function(){
		// after removing all encrypt buttons present !!!

		setTimeout(function(){
				var buttonplacer = document.getElementsByClassName('n1tfz');
				for (var i = buttonplacer.length - 1; i >= 0; i--) {
					// buttonplacer[i].insertBefore(tableCell, buttonplacer[i].firstChild);

					//adding table element
					var tableCell = document.createElement('td');
					tableCell.className = "tableCell";

					//add button wrapper
					var buttonwrapper = document.createElement('div');
					buttonwrapper.className = "buttonwrapper";

					//adding a new button
					var innerbutton = document.createElement('div');
					innerbutton.className = "innerbutton no-select";
					innerbutton.innerHTML="Encrypt";
					innerbutton.id = "innerbutton_"+i;
					console.log("adding " + innerbutton.id);
					buttonwrapper.appendChild(innerbutton);
					tableCell.appendChild(buttonwrapper);
					var isset = 0;
					for (var iter = buttonplacer[i].childNodes.length - 1; iter >= 0; iter--) {
						if (buttonplacer[i].childNodes[iter].className == "tableCell") {isset=1;break;};
					};
					if(isset==0){
						buttonplacer[i].insertBefore(tableCell, buttonplacer.firstChild);	
					}
					
				}
				clicktoEncrypt();
				Close_Discard_ComposeBox();

			}, 1000);
	}

	// check if compose-mail UI is visble 
	function composeUIFrame(){
        try {
            return document.getElementsByClassName('aYF').length > 0;
        } catch (e) {
            return false;
        }
	}

	//change UI of compose-mail box
	var addcryptana = function (){
		var peek;

		if(composeUIFrame()){
			clearTimeout(peek);
			//----------------------//if encrypt exits dont add !!!
			//remove whatever buttons are there
			// //Changing title board
			var messageeTitle = document.getElementsByClassName('aYF');
			console.log(messageeTitle.length+": cryptana message title set");
			// for (var i = messageeTitle.length - 1; i >= 0; i--) {
			// 	messageeTitle[i].innerHTML = "New Cryptana Message";
			// };

			// //Changing Send button ka text !!!
			var sendbuttontext = document.getElementsByClassName('T-I J-J5-Ji aoO T-I-atl L3');
			console.log(sendbuttontext.length+": cryptana send button text set");
			// for (var i = sendbuttontext.length - 1; i >= 0; i--) {
			// 	sendbuttontext[i].innerHTML = "Encrypt + Send";
			// 	sendbuttontext[i].style.background = "#FF4040";
			// };

			//where to add??
			setTimeout(function(){
				var buttonplacer = document.getElementsByClassName('n1tfz');
				for (var i = buttonplacer.length - 1; i >= 0; i--) {
					// buttonplacer[i].insertBefore(tableCell, buttonplacer[i].firstChild);

					//adding table element
					var tableCell = document.createElement('td');
					tableCell.className = "tableCell";

					//add button wrapper
					var buttonwrapper = document.createElement('div');
					buttonwrapper.className = "buttonwrapper";

					//adding a new button
					var innerbutton = document.createElement('div');
					innerbutton.className = "innerbutton no-select";
					innerbutton.innerHTML="Encrypt";
					innerbutton.id = "innerbutton_"+i;
					console.log("adding " + innerbutton.id);
					buttonwrapper.appendChild(innerbutton);
					tableCell.appendChild(buttonwrapper);
					var isset = 0;
					for (var iter = buttonplacer[i].childNodes.length - 1; iter >= 0; iter--) {
						if (buttonplacer[i].childNodes[iter].className == "tableCell") {isset=1;break;};
					};
					if(isset==0){
						buttonplacer[i].insertBefore(tableCell, buttonplacer.firstChild);	
					}
					
				}
				clicktoEncrypt();
				Close_Discard_ComposeBox();

			}, 500);
			

			return 1;

		}else{
			 console.log("loading Compose mail box");
			peek = setTimeout(function(){addcryptana();}, 500);
		}
		
	}

	function clicktoEncrypt(){
		$('.innerbutton').click(function(){
			var button_id = this.id;
			console.log("click on "+button_id);
			var textholder = button_id.substring(12);//button number
			//get Ar Au of the same number and then get gmail_default
			var aaruElement = document.getElementsByClassName('Ar Au')[parseInt(textholder)];
			var requiredtextfield = $(aaruElement).find('.gmail_default')[0];
			console.log("content here is: "+requiredtextfield.innerText+": ai hai");
			// document.getElementsByClassName("gmail_default")[parseInt(textholder)].innerHTML+=" idhar click kiya !!!!";
			whichDivtoEdit = requiredtextfield;
			//addoverlay div to select!!!
			createOverlay(button_id);

		})
	}

	function createOverlay(button_id){
		//remove if already present
		$(".overlay-container").remove();

		//create specially for this guy !!!
		var overall_container = document.createElement('div');
		overall_container.className = "overlay-container";
		overall_container.id = "encrytfunctions";
		overall_container.innerHTML = "Select Encryption Function";

		var crypt_funcs = new Array("AES", "DES", "3DES", "Rabbit", "RC4");

		for (var i = 4; i >=0; i--) {
			var option_container = document.createElement('div');
			option_container.className = "option-container";
			option_container.id = "encryptFunc"+crypt_funcs[i];
			option_container.innerHTML = "Use "+crypt_funcs[i];
			overall_container.appendChild(option_container);
		};
		document.body.appendChild(overall_container);
		console.log("clicked Encrypt");
		//check if already encrypted  ###################################################################################
		function_selectors();
	}

	function function_selectors(whichAlgo){
		$(".option-container").click(function(){
			var func_id = this.id;
			whichAlgo = func_id.substring(11);
			console.log("chose "+func_id.substring(11));
			$(".overlay-container").remove();
			whichAlgouse = func_id.substring(11);
			AskPassKey();
		});
	}

	function AskPassKey(){
		var password_container = document.createElement('div');
		password_container.className ="password-container";
		var password_input = document.createElement('input');
		password_input.className = "password-input";
		password_input.type = "password";
		password_input.placeholder ="Enter key to Encrypt, press Enter";
		password_input.id ="passKEY";
		password_container.appendChild(password_input);
		document.body.appendChild(password_container);
		var passkee="";
		$('.password-input').keyup(function (e) {
		    if (e.keyCode == 13) {
		    	 passkee= document.getElementById('passKEY').value;
		    	 $('.password-container').remove();
    	 		switch(whichAlgouse){
					case "AES" :
									console.log("Encrypting here");
						var encrypted = CryptoJS.AES.encrypt(whichDivtoEdit.innerHTML, passkee);
						console.log(whichDivtoEdit.innerHTML+" #### becomes #### "+encrypted);
						whichDivtoEdit.innerHTML="";
						whichDivtoEdit.innerHTML = "Decrypt 5 "+encrypted;
						// var decryptbutton = document.createElement('div');
						// decryptbutton.className = "decrypter-button";
						// decryptbutton.id = "Algo_AES";
						// decryptbutton.innerHTML= "Decrypt 5 "+encrypted;
						// whichDivtoEdit.appendChild(decryptbutton);
						break;


					case "DES" :
									console.log("Encrypting here");
						var encrypted = CryptoJS.DES.encrypt(whichDivtoEdit.innerHTML, passkee);
						console.log(whichDivtoEdit.innerHTML+" #### becomes #### "+encrypted);
						whichDivtoEdit.innerHTML="";
						whichDivtoEdit.innerHTML = "Decrypt 4 "+encrypted;
						// var decryptbutton = document.createElement('div');
						// decryptbutton.className = "decrypter-button";
						// decryptbutton.id = "Algo_DES";
						// decryptbutton.innerHTML= "Decrypt 4 "+encrypted;
						// whichDivtoEdit.appendChild(decryptbutton);
						break;

					case "3DES" :
									console.log("Encrypting here");
						var encrypted = CryptoJS.TripleDES.encrypt(whichDivtoEdit.innerHTML, passkee);
						console.log(whichDivtoEdit.innerHTML+" #### becomes #### "+encrypted);
						whichDivtoEdit.innerHTML="";
						whichDivtoEdit.innerHTML = "Decrypt 3 "+encrypted;
						// var decryptbutton = document.createElement('div');
						// decryptbutton.className = "decrypter-button";
						// decryptbutton.id = "Algo_3DES";
						// decryptbutton.innerHTML= "Decrypt 3 "+encrypted;
						// whichDivtoEdit.appendChild(decryptbutton);
						break;

					case "Rabbit" :
									console.log("Encrypting here");
						var encrypted = CryptoJS.Rabbit.encrypt(whichDivtoEdit.innerHTML, passkee);
						console.log(whichDivtoEdit.innerHTML+" #### becomes #### "+encrypted);
						whichDivtoEdit.innerHTML="";
						whichDivtoEdit.innerHTML = "Decrypt 2 "+encrypted;
						// var decryptbutton = document.createElement('div');
						// decryptbutton.className = "decrypter-button";
						// decryptbutton.id = "Algo_Rabbit";
						// decryptbutton.innerHTML= "Decrypt 2 "+encrypted;
						// whichDivtoEdit.appendChild(decryptbutton);
						break;

					case "RC4" :
									console.log("Encrypting here");
						var encrypted = CryptoJS.RC4.encrypt(whichDivtoEdit.innerHTML, passkee);
						console.log(whichDivtoEdit.innerHTML+" #### becomes #### "+encrypted);
						whichDivtoEdit.innerHTML="";
						whichDivtoEdit.innerHTML = "Decrypt 1 "+encrypted;
						// var decryptbutton = document.createElement('div');
						// decryptbutton.className = "decrypter-button";
						// decryptbutton.id = "Algo_RC4";
						// decryptbutton.innerHTML= "Decrypt 1 "+encrypted;
						// whichDivtoEdit.appendChild(decryptbutton);
						break;

				}

		    }
		});


	}

	function Close_Discard_ComposeBox(){
		var composeboxclosebutton = head.getElementsByClassName('Ha');
		for (var i = composeboxclosebutton.length - 1; i >= 0; i--) {
			composeboxclosebutton[i].onmouseup = function(){
				console.log("Closed");
				$(".tableCell").remove();
				setTimeout(function(){addEncrypt_Replybar();}, 1000);
			};
		}

		var composeboxDiscardbutton = head.getElementsByClassName("og T-I-J3");
		for (var i = composeboxDiscardbutton.length - 1; i >= 0; i--) {
			composeboxDiscardbutton[i].onmouseup = function(){
				console.log("Discarded");
				$(".tableCell").remove();
				setTimeout(function(){addEncrypt_Replybar();}, 1000);
			};
		}

	}
    waitForGmailToLoad();

// <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
// var evt1 = document.createEvent("MouseEvents");
// var evt2 = document.createEvent("MouseEvents");
// evt1.initMouseEvent("mousedown", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
// evt2.initMouseEvent("mouseup", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
 
// // Here jQuery('.T-I.J-J5-Ji.nu.T-I-ax7.L3') is the gmail refresh button
// jQuery('.T-I.J-J5-Ji.nu.T-I-ax7.L3').each(function(d,element){
//   element.dispatchEvent(evt1);
//   element.dispatchEvent(evt2);
// });