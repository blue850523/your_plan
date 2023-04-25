<template>
	<div class="header">
		<el-button type="primary" @click="ticket_modal_open()">新增事項</el-button>
		<el-button type="primary" @click="status_modal_open()">新增狀態</el-button>
		<el-popconfirm
			confirm-button-text="確定"
			cancel-button-text="取消"
			:icon="InfoFilled"
			icon-color="red"
			title="確定要清空所有事項嗎？"
			@confirm="clean_tickets()"
		>
			<template #reference>
				<el-button>清空事項</el-button>
			</template>
		</el-popconfirm>
	</div>
  	<div class="container">
		<!-- 對被放置的element容器要設置drop dragenter dragover三個event -->
		<div 
			class="plan_board"
			v-for="(it, index) in status"
			:key="`plan_board_${index}`"
			@drop="on_drag($event, index + 1)"
			@dragenter.prevent
			@dragover.prevent
		>
			<div class="status_title">
				<template v-if="status_editing[index]">
					<el-input v-model="status[index]" maxlength="50"/>
				</template>
				<template v-else>
					<span>{{ it }}</span>
				</template>
				<el-button-group>
					<el-button type="text" :icon="status_editing[index] ? Check : Edit" @click="edit_status_name(index, !status_editing[index]) "/>
					<el-button type="text" :icon="Delete" @click="delete_status(index)" v-show="!status_editing[index]"/>
				</el-button-group>
			</div>
			<div 
				class="plan_list" 
				v-for="it2 in getTicket(index + 1)" 
				:key="it2.id" 
				draggable="true" 
				@dragstart="start_drag($event, it2)"
				@click="ticket_modal_open(false, it2)"
			>
				<span class="plan_list_title">{{ it2.title }}</span>
				<span>{{ it2.id }}</span>
			</div>
		</div>
	</div>

	<TicketModel 
		:is_open="ticket_modal_is_open"
		:is_create="ticket_modal_is_create"
		:data="ticket_modal_data"
		@ticket_add="handle_ticket_add"
		@ticket_save="handle_ticket_save"
		@ticket_delete="handle_ticket_delete"
		@modal_close="handle_ticket_modal_close"
	></TicketModel>
	<StatusModel
		:is_open="status_modal_is_open"
		@status_add="handle_status_modal_add"
		@modal_close="handle_status_modal_close"
	></StatusModel>
</template>

<script setup>
	import { InfoFilled, Edit, Check, Delete } from '@element-plus/icons-vue'
	import { ElMessageBox, ElMessage } from 'element-plus'
	import TicketModel from "./components/ticket_modal.vue"
	import StatusModel from "./components/status_modal.vue"
	import { onMounted, ref, watch } from "vue"
	const status = ref([
		"待辦事項", "進行中", "已完成"
	]);
	const status_editing = ref([
		false, false, false
	]);
	const tickets = ref([]);
	const ticket_next_id = ref(1);

	onMounted(() => {
		if (localStorage.getItem("status"))
			status.value = JSON.parse(localStorage.getItem("status"));
		if (localStorage.getItem("tickets"))
			tickets.value = JSON.parse(localStorage.getItem("tickets"));
		if (localStorage.getItem("ticket_next_id"))
			ticket_next_id.value = JSON.parse(localStorage.getItem("ticket_next_id"));
	})
	watch(status, (newValue, oldValue) => {
		localStorage.setItem("status", JSON.stringify(status.value));
	}, { deep: true });
	watch(tickets, (newValue, oldValue) => {
		localStorage.setItem("tickets", JSON.stringify(tickets.value));
	}, { deep: true });
	watch(ticket_next_id, (newValue, oldValue) => {
		localStorage.setItem("ticket_next_id", JSON.stringify(ticket_next_id.value));
	}, { deep: true });

	const ticket_modal_is_open = ref(false);
	const ticket_modal_is_create = ref(true);
	const ticket_modal_data = ref({});
	function ticket_modal_open (is_create = true, data = {}) {
		ticket_modal_is_open.value = true;
		
		if (is_create) return;
		ticket_modal_data.value = data;
		ticket_modal_is_create.value = false;
	}
	function handle_ticket_add (data) {
		handle_ticket_modal_close();
		const id = ticket_next_id.value;
		const ticket = {
			id: id,
			title: data.title,
			remark: data.remark ?? "",
			list: 1
		}
		tickets.value.push(ticket);
		ticket_next_id.value += 1;
	}
	function handle_ticket_save (data) {
		handle_ticket_modal_close();
		tickets.value.forEach(it => {
			if (it.id === data.id) Object.assign(it, data)
		});
	}
	function handle_ticket_delete (data) {
		handle_ticket_modal_close();
		tickets.value = tickets.value.filter(it => it.id !== data.id);
	}
	function handle_ticket_modal_close () {
		ticket_modal_is_open.value = false;
		ticket_modal_is_create.value = true;
		ticket_modal_data.value = {};
	}

	const status_modal_is_open = ref(false);
	function status_modal_open () {
		status_modal_is_open.value = true;
	}
	function handle_status_modal_add (status_name) {
		handle_status_modal_close();
		status.value.push(status_name);
		status_editing.value.push(false);
	}
	function handle_status_modal_close () {
		status_modal_is_open.value = false;
	}
 
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
	function clean_tickets () {
		tickets.value = [];
		ticket_next_id.value = 1;
		ElMessage({
			message: '事項清空成功！',
			type: 'success',
		});
	}
	function delete_status (index) {
		ElMessageBox.confirm("確定要刪除此狀態嗎？底下所有事項也將會被清除！", "刪除",{
			confirmButtonText: '確定',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(() => {
			tickets.value = tickets.value.filter(it => it.list !== index + 1);
			status.value.splice(index, 1);
			status_editing.value.splice(index, 1);
			ElMessage({
				message: '狀態刪除成功！',
				type: 'success',
			});
		}).catch(() => {
			return	
		});
	}
	function edit_status_name (index, active) {
		status_editing.value[index] = active;
	}
</script>

<style>
:root {
	--header-hight: 3.2rem;
}
body {
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 16px;
}
.header {
	display: flex;
    align-items: center;
    justify-content: flex-end;
	flex-wrap: wrap;
	min-height: var(--header-hight);
    padding: 0 .5rem;
	background: #cccccc;
}
.container {
	display: flex;
	width: 100%;
	min-height: calc(100vh - var(--header-hight));
	background: #cccccc;
	overflow: auto;
}
.plan_board {
	width: 15rem;
	min-width: 16rem;
	margin: .5rem;
	padding: .5rem;
	border-radius: .25rem;
	background: #eeeeee;
	box-sizing: border-box;
}
.plan_board:not(:first-child) {
	margin-left: 0;
}
.status_title {
    margin: .25rem .25rem .75rem;
	display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.status_title span {
	flex: 7;
	display: inline-block;
	margin: .2rem 0 0 .2rem;
	overflow-wrap: anywhere;
}
.status_title .el-input {
	flex: 7;
	font-size: 1rem;
}
.status_title .el-button-group {
	flex: 2;
	display: flex;
	justify-content: space-between;
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
	cursor: pointer;
}
.plan_list:nth-last-of-type(1) {
	margin-bottom: 0;
}
.plan_list_title {
	word-break: break-all;
}
</style>
