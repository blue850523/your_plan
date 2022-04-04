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
