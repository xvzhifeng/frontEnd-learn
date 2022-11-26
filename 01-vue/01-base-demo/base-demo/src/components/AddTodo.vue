<template>
<el-dialog v-model="show" title="Add Memo Record">
        <el-form :model="form">
            <el-form-item label="Kind" :label-width="formLabelWidth">
                <el-input v-model="form.kind" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Detail" :label-width="formLabelWidth">
                <el-input v-model="form.detail" :rows="2" type="textarea" placeholder="Please input" />
            </el-form-item>
            <el-form-item label="Tag" :label-width="formLabelWidth">
                <el-select v-model="form.tag" placeholder="Please select a Type">
                    <el-option label="Plan" value="Plan" />
                    <el-option label="Discard" value="Discard" />
                    <el-option label="Completed" value="Completed" />
                    <el-option label="Inprogress" value="Inprogress" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="$emit('add_cancel')">Cancel</el-button>
                <el-button type="primary" @click="$emit('add_todo_data', form)" class="text-gray-600">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onUnmounted, onMounted } from 'vue'
import { uuid } from 'vue-uuid';
const form = reactive({
    id: "",
    date: "",
    name: "",
    detail: "",
    kind: "",
    tag: ""
})
const STORAGE_KEY = 'vue-memo'
const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const props = defineProps(['dialogFormVisible'])
let show = computed(()=>props.dialogFormVisible)
dialogFormVisible.value = props.dialogFormVisible
interface Memo {
    id: string
    date: string
    name: string
    detail: string
    kind: string
    tag: string
}
let tableData: Memo[] = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
function getCurDate() {
    return new Date().toJSON().substr(0, 10);
};
let add_memo = () => {
    console.log(form)

    if (form.id) {
        // edit
        tableData.forEach((item, index, arr) => {
            if (item.id == form.id) {
                arr.splice(index, 1)
                arr.splice(index, 0, {
                    id: form.id, date: form.date, name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
                })
            }
        })
        // tableData.push({
        //     id: form.id, date: "2016-05-03", name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
        // })
    } else {
        // add
        tableData.push({
            id: uuid.v1(), date: getCurDate(), name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
        })
    }
    form.date = ""
    form.name = ""
    form.detail = ""
    form.kind = ""
    form.tag = ""
    form.id = ""
    console.log(tableData)
    dialogFormVisible.value = false
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData))
}


</script>
