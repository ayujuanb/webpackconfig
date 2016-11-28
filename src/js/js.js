var React=require('react');
var ReactDom=require("react-dom");

var names=["alice","emily","kateg"];
ReactDom.render(
	<div>
	{
		names.map(function(name,i){
			return <p key={i}>hello,{name}</p>
		})
	}
	</div>,
	document.getElementById("example")
);