import React from "react";

const App = () => {
	return (
		<div className="flex flex-col inset-0 absolute">
    <div className="w-[190px] h-[100px] bg-green-500 overflow-hidden">
        <div className="flex-grow flex gap-4">
            <div className="w-[100px] h-[100px] bg-black"></div>
            <div className="w-[100px] h-[100px] bg-black"></div>
            <div className="w-[100px] h-[100px] bg-black"></div>
            <div className="w-[100px] h-[100px] bg-black"></div>
        </div>
    </div>
</div>

	);
};

export default App;
