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
