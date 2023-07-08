<script context="module">
	export function generalInputCard(card, cardNum) {
		const inputElementString = `<input id="text_${cardNum}" type="text" class="outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[30px] px-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_${card.id}"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: ${card.size.height}px; width: ${card.size.width}px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        ${card.name}
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_${card.id}" id="input_${cardNum}"></span>
                        </span>
						${inputElementString}
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_${card.id}" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function generalTextareaCard(card, cardNum) {
		const textareaElementString = `<textarea id="text_${cardNum}" class="outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}"></textarea>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_${card.id}"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: ${card.size.height}px; width: ${card.size.width}px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        ${card.name}
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_${card.id}" id="input_${cardNum}"></span>
                        </span>
						${textareaElementString}
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_${card.id}" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}
</script>
