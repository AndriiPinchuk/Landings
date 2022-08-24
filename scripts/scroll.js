var tbutton = document.getElementById("go-to-top-button");
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {myFunction()};
var scrolled;

function myFunction(){
var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
scrolled = (winScroll / height) * 100;
document.getElementById("myBar").style.width = scrolled + "%";
var currentScrollPos = window.pageYOffset;
if(prevScrollpos>currentScrollPos){document.getElementById("navbar").style.top = "0";}else{document.getElementById("navbar").style.top="-50px";}
prevScrollpos = currentScrollPos;
if (scrolled>20){document.getElementById("go-to-top-button").style.display="block";}else{document.getElementById("go-to-top-button").style.display="none";}
if (scrolled>52){
	document.body.style.backgroundImage="url('img/codeImg2.jpg')";
}else{document.body.style.backgroundImage="url('img/codeImg.jpg')";
}

}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}