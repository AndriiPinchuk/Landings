var tbutton = document.getElementById("go-to-top-button");
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {myFunction()};
var scrolled;


$(document).ready(function(){
	$('.slider').slick({
		arrows: true,
		dots:true,
		adaptiveHeight: true,
		slidesToShow:1,
		slidesToScroll:1,
		speed: 2000,
		easing:'ease',
		infinite: true,
		initialSlide: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		pauseOnFocus: true,
		pauseOnHover: true,
		pauseOnDotHover: true,
		/*PC*/
		draggable: true,
		/*mobile touch*/
		swipe:true,
		touchThreshold:10,
		touchMove:true, //can move

		waitForAnimate:false,
		centerMode: true,
		variableWidth: false,
		/*
		rows: 1,
		slidesPerRow:1,
		*/
		/*vertical*/
		/*
		vertical: false,
		verticalSwiping:false,
		*/




	});
});

function myFunction(){
var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
scrolled = (winScroll / height) * 100;
document.getElementById("myBar").style.width = scrolled + "%";
var currentScrollPos = window.pageYOffset;
if(prevScrollpos>currentScrollPos){document.getElementById("navbar").style.top = "0";}else{document.getElementById("navbar").style.top="-50px";}
prevScrollpos = currentScrollPos;
if (scrolled>20){document.getElementById("go-to-top-button").style.display="block";}else{document.getElementById("go-to-top-button").style.display="none";}
if (scrolled>60){
	document.body.style.backgroundImage="url('img/codeImg2.jpg')";
}else{document.body.style.backgroundImage="url('img/codeImg.jpg')";
}

}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}