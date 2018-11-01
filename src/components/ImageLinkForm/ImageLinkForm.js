import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className = "f3"> 
				{'This Magic Brain will detect a face when you input an image, give it a try'}
			</p>

			<div className = 'center'>
				<div className = 'form center pa4 br3 shadow-5' >
					<input 
					className = "f4 pa2 w-70 center" 
					type = "text"
					onInput = {onInputChange}/> 
					<button 
					className = "w-30 grow f4 link dib ph3 pv2 white dib bg-light-purple" 
					onClick = {onButtonSubmit}> Detect </button>
				</div>
			</div>
		</div>
	)
};

export default ImageLinkForm;