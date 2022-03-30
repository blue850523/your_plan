<template>
	<transition name="fade">
		<div class="modal" v-if="props.is_open">
			<div class="modal_inner">
				<div class="modal_content">
					<div class="form_group">
						<div class="title required" :class="{ 'has_error': title_error }">事項</div>
						<el-input v-model="data.title" maxlength="50"/>
					</div>
					<div class="form_group">
						<div class="title">備註</div>
						<el-input v-model="data.remark" maxlength="500" type="textarea" :rows="2"/>
					</div>
				</div>
				<div class="modal_footer">
					<el-button v-if="!is_create" type="danger" @click="handle_ticket_delete()">刪除</el-button>
					<el-button type="primary" @click="handle_modal_save()">{{ props.is_create ? "新增" : "保存" }}</el-button>
					<el-button type="primary" @click="handle_modal_close()">關閉</el-button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	import { ref, watchEffect } from "vue"
	const props = defineProps({
		is_open: {
			type: Boolean,
			default: false,
			required: true,
		},
		is_create: {
			type: Boolean,
			default: true,
		},
		data: {
			type: Object,
			default: {},
			required: false,
		}
	});
	const emit = defineEmits(["ticket_add", "ticket_save", "ticket_delete", "modal_close"]);
	const data = ref({});
	const title_error = ref(false);

	watchEffect(() => {
		data.value = JSON.parse(JSON.stringify(props.data));
	});

	function handle_modal_save () {
		if (data.value.title.length === 0) {
			title_error.value = true;
		} else {
			props.is_create ? emit("ticket_add", data.value) : emit("ticket_save", data.value);
			reset();
		}
	}
	function handle_ticket_delete () {
		emit("ticket_delete", data.value);
		reset();
	}
	function handle_modal_close () {
		emit("modal_close");
		reset();
	}
	function reset () {
		data.value = {};
        title_error.value = false;
    }
</script>

<style scoped>
.modal {
	position: fixed;
    top: 0;
	left: 0;
    height: 100%;
    width: 100%;
	overflow: hidden auto;
	background-color: rgba(0, 0, 0, .5);
	z-index: 1;
}
.modal_inner {
    max-width: 500px;
    margin: 5vh auto;
	padding: 1rem;
	border-radius: .3rem;
	background: white;
    color: black;
}
.form_group {
	display: flex;
    margin: 0.5rem 0;
	align-items: center;
}
.title {
	margin-right: 1rem;
	flex: 1;
}
.required::before {
    content: "*";
    color: red;
}
.has_error {
    color: red;
}
.el-input,
.el-textarea {
	flex: 7;
	font-size: 1rem;
    box-sizing: border-box;
    color: #606266;
}
.modal_footer {
	display: flex;
    justify-content: flex-end;
}
/* transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
