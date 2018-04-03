function display_ans(n){

	var x=document.getElementsByTagName("iframe");

	if(x[n-1].style.display=="block")
		x[n-1].style.display="none";
	else
		x[n-1].style.display="block"
}
