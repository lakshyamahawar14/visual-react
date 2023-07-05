<div class="main min-h-[100vh] min-w-[100vw] flex">
	<div class="sidebar z-[100]">
		<aside
			class="flex flex-col w-[15%] min-w-[200px] h-screen px-5 py-8 overflow-y-auto bg-[#fcfcfc] border-[#dddddd] border-r-[1px]"
		>
			<a href="/">
				<h1 class="cursor-default font-[600] tracking-wide">
					Visual React <span class="version font-[400]">v1.0</span>
				</h1>
			</a>

			<div class="flex flex-col justify-between flex-1 mt-6">
				<nav class="-mx-3 space-y-6">
					<div class="space-y-3">
						<h2 class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">canvas</h2>

						<p
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200"
						>
							<span class="mx-2 text-sm font-medium">New Canvas</span>
						</p>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">+ Add Canvas</span>
						</a>
					</div>

					<div class="space-y-3">
						<h2 class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">cards</h2>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Routes</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Components</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Hooks</span>
						</a>

						<a
							class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:text-gray-200"
							href="/"
						>
							<span class="mx-2 text-sm font-medium">Event Listeners</span>
						</a>
					</div>
				</nav>
			</div>
		</aside>
	</div>
	<div class="canvas w-[100%]">
		<div
			class="absolute bottom-0 h-[25%] w-[100%] bg=[#fcfcfc] flex items-center justify-center border-t-[1px] border-[#dddddd]"
		>
			{#each [1, 2, 3, 4] as card}
				<div
					draggable="true"
					class="bg-[#fcfcfc] w-[10vw] rounded-lg h-[10vh] border-2 flex justify-center items-center p-[10px] m-[10px]"
				>
					<p>Card {card}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
