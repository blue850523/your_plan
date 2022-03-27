<template>
  	<div class="container">
		<!-- 對被放置的element容器要設置drop dragenter dragover三個event -->
		<div 
			class="plan_board" 
			v-for="(it, index) in status"
			:key="index"
			@drop="on_drag($event, index + 1)"
			@dragenter.prevent
			@dragover.prevent
		>
			<div class="status_title">{{ it }}</div>
			<div 
				class="plan_list" 
				v-for="it2 in getTicket(index + 1)" 
				:key="it2.id" 
				draggable="true" 
				@dragstart="start_drag($event, it2)"
			>
				<span>{{ it2.title }}</span>
				<span>{{ it2.id }}</span>
			</div>
		</div>
		<!-- <div 
			class="plan_board" 
			@drop="on_drag($event, 1)"
			@dragenter.prevent
			@dragover.prevent
		>
			<div 
				class="plan_list" 
				v-for="it in getTicket(1)" 
				:key="it.id" 
				draggable="true" 
				@dragstart="start_drag($event, it)"
			>
				{{ it.title }}
			</div>
		</div>
		<div 
			class="plan_board" 
			@drop="on_drag($event, 2)"
			@dragenter.prevent
			@dragover.prevent
		>
			<div 
				class="plan_list" 
				v-for="it in getTicket(2)" 
				:key="it.id" 
				draggable="true" 
				@dragstart="start_drag($event, it)"
			>
				{{ it.title }}
			</div>
		</div> -->
	</div>
</template>

<script setup>
import { reactive, ref } from "vue"
	const status = reactive([
		"待辦事項", "進行中", "已完成"
	])

	const tickets = ref([
		{ id: 1, title: "Item A", list: 1 },
		{ id: 2, title: "Item B", list: 1 },
		{ id: 3, title: "Item C", list: 2 },
	])

	function getTicket (list_id) {
		return tickets.value.filter((it) => it.list == list_id);
	}
	
	function start_drag (event, it) {
		event.dataTransfer.dropEffect = "move";
		event.dataTransfer.effectAllowed = "move";
		// dataTransfer.setData 用來設置當拖曳對象放到放置目標時 所能取得的資料類型
		event.dataTransfer.setData("listID", it.id);
	}

	function on_drag (event, list_id) {
		const listID = event.dataTransfer.getData("listID");
		const list = tickets.value.find((it) => it.id == listID);
		list.list = list_id;
	}
</script>

<style>
body {
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.container {
	display: flex;
	width: 100%;
	height: 100vh;
	background: #cccccc;
	overflow: auto;
}
.plan_board {
	width: 15rem;
	margin: .5rem;
	padding: .5rem;
	min-height: 1rem;
	border-radius: .25rem;
	background: #eeeeee;
	cursor: pointer;
}
.plan_board:not(:first-child) {
	margin-left: 0;
}
.status_title {
    margin: 0.25rem 0.25rem 0.75rem;
	text-align: left;
}
.plan_list {
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	padding: .5rem;
	margin-bottom: .5rem;
	border-radius: .2rem;
	background: #88bbff;
	color: #ffffff;
	box-shadow: 0 1px 2px 0 rgb(9 30 66 / 25%);
}
.plan_list:nth-last-of-type(1) {
	margin-bottom: 0;
}
</style>
