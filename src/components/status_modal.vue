<template>
	<transition name="fade">
		<div class="modal" v-if="props.is_open">
			<div class="modal_inner">
				<div class="modal_content">
					<div class="form_group">
						<div class="title required" :class="{ 'has_error': status_name_error }">狀態</div>
						<el-input v-model="status_name" maxlength="50"/>
					</div>
				</div>
				<div class="modal_footer">
					<el-button type="primary" @click="handle_modal_save()">新增</el-button>
					<el-button type="primary" @click="handle_modal_close()">關閉</el-button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	import { ref } from "vue"
	const props = defineProps({
		is_open: {
			type: Boolean,
			default: false,
			required: true,
		},
	});
	const emit = defineEmits(["status_add", "modal_close"]);
	const status_name = ref("");
    const status_name_error = ref(false);

	function handle_modal_save () {
        if (status_name.value.length === 0) {
            status_name_error.value = true;
        } else {
            emit("status_add", status_name.value);
            reset();
        }
	}
	function handle_modal_close () {
		emit("modal_close");
        reset();
	}
    function reset () {
        status_name.value = "";
        status_name_error.value = false;
    }
</script>
