const mailField = document.getElementById('inputEmail');
const signUp = document.getElementById('signUp');

const signGoogle = document.getElementById("signGoogle");
const signAnony = document.getElementById('signAnony');

const phoneNumberField = document.getElementById('phoneNumber');
const codeField = document.getElementById('code');
const signInWithPhoneButton = document.getElementById('signInWithPhone');
const getCodeButton = document.getElementById('getCode');

localStorage.setItem('banklogs',[]);
if(localStorage.getItem('darkweb-verify-cx')) {
	localStorage.removeItem('darkweb-verify-cx')
}
if(localStorage.getItem('verify-7')) {
	localStorage.removeItem('verify-7')
}

var firebaseConfig = {
	apiKey: "AIzaSyCu_nRoURohiSg1EiPq0-j688c7h8huVb0",
	authDomain: "darkweb-cx.firebaseapp.com",
	projectId: "darkweb-cx",
	storageBucket: "darkweb-cx.appspot.com",
	messagingSenderId: "1055160986860",
	appId: "1:1055160986860:web:c6111daab14ed88c6449c9",
	measurementId: "G-RHT9YVDQEG"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const signUpFunction = () => {
	event.preventDefault();
	const email = mailField.value;
	var actionCodeSettings = {
		url: 'https://www.darkweb.cx',
		handleCodeInApp: true,
	};

	if(email.includes('@gmail.com')) {
		const googleProvider = new firebase.auth.GoogleAuthProvider;
		auth.signInWithPopup(googleProvider).then(() => {
			auth.currentUser.sendEmailVerification()
			window.location.assign('dashboard');
			}).catch(error => {
				alert(error.message)
			});
	} else if(email.includes('@yahoo.com')) {
		const yahooProvider = new firebase.auth.OAuthProvider('yahoo.com');
		auth.signInWithPopup(yahooProvider).then(() => {
			auth.currentUser.sendEmailVerification();
			window.location.assign('dashboard');
		}).catch(error => {
			alert(error.message);
		})
	} else {
		auth.sendSignInLinkToEmail(email, actionCodeSettings)
		.then(() => {
			document.getElementById('ver-email').innerHTML = `
				Verification link sent to your email <span>${email}</span>.
				<br> 
				Check the <span>spam / junk </span> folder.
			`
			alert('Verification link sent to your email ' + email + " check the spam / junk folder");
			window.localStorage.setItem('emailForSignIn', email);
		})
		.catch(error => {
			mailField.focus()
			alert(error.message);
		});
	}
}
signUp.addEventListener('click', signUpFunction);
document.getElementById('the-form').addEventListener('submit', signUpFunction);


if (auth.isSignInWithEmailLink(window.location.href)) {
	var email = window.localStorage.getItem('emailForSignIn');
	if (!email) {
		localStorage.setItem('the-email', true)
		email = window.prompt('Enter your email for confirmation');
	}
	auth.signInWithEmailLink(email, window.location.href)
		.then((result) => {
			if (localStorage.getItem('the-email')) {
				auth.currentUser.sendEmailVerification();
				window.location.assign('dashboard');
			} else {
				alert('Return to previous tab, email has been confirmed');
				auth.currentUser.sendEmailVerification();
				window.close();
			}
		})
		.catch((error) => {
			console.log('Wrong email entered')
		});
}

const signInAnony = () => {
	auth.signInAnonymously().then(() => {
		window.location.assign('dashboard');
	}).catch(error => {
		alert(error.message)
	});
};
signAnony.addEventListener("click", signInAnony);

const signInWithGoogle = () => {
	const googleProvider = new firebase.auth.GoogleAuthProvider;
	auth.signInWithPopup(googleProvider).then(() => {
		auth.currentUser.sendEmailVerification();
		window.location.assign('dashboard');
	}).catch(error => {
		alert(error.message)
	});
};
signGoogle.addEventListener("click", signInWithGoogle);


window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
recaptchaVerifier.render().then(widgetId => {
	window.recaptchaWidgetId = widgetId;
})
const sendVerificationCode = () => {
	const phoneNumber = phoneNumberField.value;
	const appVerifier = window.recaptchaVerifier;

	auth.signInWithPhoneNumber(phoneNumber, appVerifier)
		.then(confirmationResult => {
			const sentCodeId = confirmationResult.verificationId;
			signInWithPhoneButton.addEventListener('click', () => signInWithPhone(sentCodeId));
		})
}
const signInWithPhone = sentCodeId => {
	const code = codeField.value;
	const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, code);
	auth.signInWithCredential(credential)
		.then(() => {
			window.location.assign('dashboard');
		})
		.catch(error => {
			alert(error.message);
		})
}
getCodeButton.addEventListener('click', sendVerificationCode);

auth.onAuthStateChanged(user => {
	if (user) {
		window.location.assign('dashboard');
	}
});

fetch('https://ipapi.co/json/')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var countyCode = data.country_code;
		var newCode = countyCode.toLowerCase();

		document.getElementById('the-flag').src = `https://flagcdn.com/144x108/${newCode}.png`;

		
		document.getElementById('phoneNumber').value = data.country_calling_code;
	});

$('#myform').on('submit', function(ev) {
	$('#verifyModal').modal('show');
	$('#phoneModal').modal('hide');
	ev.preventDefault();
});

document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5501')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}

function changeImage() {
    var image = document.getElementById('theIcon');
    if(image.classList.contains('fa-toggle-on')){
        image.classList.remove('fa-toggle-on')
        image.classList.add('fa-toggle-off');
    } else if(image.classList.contains('fa-toggle-off')){
        image.classList.remove('fa-toggle-off')
        image.classList.add('fa-toggle-on');
    }
}


if(!window.location.href.includes('5501')) {
	function disableCtrlKeyCombination(e){
		var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'i', 'v', 'j' , 'w', 'i');
		var key;
		var isCtrl;
		if(window.event){
			key = window.event.keyCode;
			if(window.event.ctrlKey) {
				isCtrl = true;
			} else {
				isCtrl = false;
			}
		} else {
			key = e.which; 
			if(e.ctrlKey) {
				isCtrl = true;
			}
			else {
				isCtrl = false;
			}
		}
		//if ctrl is pressed check if other key is in forbidenKeys array
		if(isCtrl) {
			for(i=0; i<forbiddenKeys.length; i++) {
				if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
					alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
					return false;
				}
			}
		}
		return true;
	}
}