    var head;
    var max_retry = 2000;
    
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
	function adjustUI(head){
		// document.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.background = "white";
		// document.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.color = "red";

		head.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.background = "#FF4040";
		head.getElementsByClassName('T-I J-J5-Ji T-I-KE L3')[0].style.color = "#B8E64B";
		console.log("UI adjusted");
		triggerclick(head);
	}

	// trigger compose mail button programatically
	function triggerclick(head){

		var evt1 = head.createEvent("MouseEvents");
		var evt2 = head.createEvent("MouseEvents");
		
		evt1.initMouseEvent("mousedown", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
		evt2.initMouseEvent("mouseup", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);

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

		// composebutton[0].dispatchEvent(evt1);
		// composebutton[0].dispatchEvent(evt2);

		console.log("triggerclick");
		// getstared();

		//add cryptana to it !!!
		//call add button script
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
				closeComposeBox();

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
			var textholder = button_id.substring(12);
			console.log("content here is: "+document.getElementsByClassName("gmail_default")[parseInt(textholder)].innerHTML+": ai hai");
			document.getElementsByClassName("gmail_default")[parseInt(textholder)].innerHTML+=" idhar click kiya !!!!";

		})
	}

	function closeComposeBox(){
		var composeboxclosebutton = head.getElementsByClassName('Ha Hb');
		for (var i = composeboxclosebutton.length - 1; i >= 0; i--) {
			composeboxclosebutton[i].onmousedown = function(){

			};

			composeboxclosebutton[i].onmouseup = function(){
				console.log("close hua reeee");
				$(".tableCell").remove();
				setTimeout(function(){addcryptana();}, 1000);
			};

		};

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