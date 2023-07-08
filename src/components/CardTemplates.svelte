<script context="module">
	import { allCards } from './BottombarCards.svelte';
	export function generalInputCard(cardId, cardNum) {
		if (cardId === 11) {
			return functionTemplate(cardNum);
		} else if (cardId === 9) {
			return constTemplate(cardNum);
		} else if (cardId === 10) {
			return letTemplate(cardNum);
		} else if (cardId === 6) {
			return useStateTemplate(cardNum);
		} else if (cardId === 7) {
			return useRefTemplate(cardNum);
		} else if (cardId === 1) {
			return componentsTemplate(cardNum);
		}
		const card = allCards[cardId];
		const inputElementString = `<input type="text" class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[30px] px-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}"></input>`;
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
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${inputElementString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_${card.id}" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function generalTextareaCard(cardId, cardNum) {
		const card = allCards[cardId];
		const textareaElementString = `<textarea class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[60%] min-h-[50%] max-h-[75%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7]" placeholder="${card.placeholder}"></textarea>`;
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
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center w-[100%] h-[100%]">
                            ${textareaElementString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_${card.id}" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function functionTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const argumentInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="argument"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_11"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        function
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_11" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${argumentInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_11" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function constTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const valueInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="value"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_9"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        const
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_9" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${valueInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_9" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function letTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const valueInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="value"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_10"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        let
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_10" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${valueInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_10" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function useStateTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const initialValueInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="initial value"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_6"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        useState
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_6" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${initialValueInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_6" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function useRefTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const initialValueInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="initial value"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_7"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        useRef
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_7" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${initialValueInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_7" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}

	export function componentsTemplate(cardNum) {
		const nameInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="name"></input>`;
		const propsInputString = `<input class="cardInputs_${cardNum} outline-none border-none rounded-lg bg-[#dddddd] bg-opacity-[0.8] text-[#101010] w-[80%] h-[50%] max-h-[80%] min-h-[30%] p-[5px] placeholder-[#333333] placeholder-opacity-[0.7] my-[5px]" placeholder="props"></input>`;
		return `
        <button class="card flex-col rounded-xl cursor-default absolute z-[35] bg-[#fcfcfc] bg-opacity-[0.4] shadow-md flex justify-start items-center backdrop-blur-[4px] id_1"
                    id="card_${cardNum}"
                    style="left: 20px; top: 20px; height: 200px; width: 200px;"
                    >
                    <p class="title absolute top-0 bg-[#dddddd] w-[100%] z-[20] text-center rounded-xl rounded-b-none cursor-move">
                        components
                    </p>
                    <p class="flex w-[100%] h-[100%] justify-between items-center text-[0.8rem] font-[600]">
                        <span class="left flex flex-start items-center pl-[10px]">
                            I/P<span class="inputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute left-[-5px] text-start cursor-pointer id_1" id="input_${cardNum}"></span>
                        </span>
						<span id="cardInputs_${cardNum}" class="flex flex-col justify-center items-center">
                            ${nameInputString}
                            ${propsInputString}
                        </span>
                        <span class="right flex flex-start items-center pr-[10px]">
                            O/P<span class="outputs h-[10px] w-[10px] z-[38] rounded-full bg-[#ff0000] absolute right-[-5px] text-start cursor-pointer id_1" id="output_${cardNum}"></span>
                        </span>
                    </p>
                </button>
        `;
	}
</script>
