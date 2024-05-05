import React from "react";

const UploadingAnimation = () => {
	return (
        <div className="w-full h-[100vh] z-auto flex justify-center absolute items-center bg-opacity-90 bg-white">
		<div className="inline-flex flex-col items-center justify-center">
			<div className="loadingio-spinner-ripple-t4ay94oxoy">
				<div className="ldio-3es9v4zliaw">
					<div></div>
					<div></div>
				</div>
			</div>
			<div>
				<h1 className="text-3xl bg-green-600 text-white rounded p-2">UPLOADING...</h1>
			</div>
		</div>
        </div>
	);
};

export default UploadingAnimation;
