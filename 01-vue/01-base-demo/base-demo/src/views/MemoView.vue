<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="Kind" prop="kind" />
        <el-table-column label="Name" prop="name" />
        <el-table-column label="detail" prop="detail" />
        <el-table-column label="Date" prop="date" />
        <el-table-column prop="tag" label="Tag" width="100" :filters="[
            { text: 'Inprogress', value: 'Inprogress' },
            { text: 'Completed', value: 'Completed' },
            { text: 'Plan', value: 'Plan' },
            { text: 'Discard', value: 'Discard' },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
            <template #default="scope">
                <el-tag :type="scope.row.tag === 'Completed' ? '' : 'success'" disable-transitions class="rounded-md">{{
                        scope.row.tag
                }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="handleShow(scope.$index, scope.row)">view</el-button>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                    class="text-gray-600">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="flex flex-row justify-end py-2 px-3">
        <el-button type="success" plain @click="dialogFormVisible = true">Add Record</el-button>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Add Memo Record">
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
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="add_memo" class="text-gray-600">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogDetail" title="Detail">
        
        <div class="w-64 h-64 " v-html="output"></div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDetail = false">Cancel</el-button>
                <el-button type="primary" @click="dialogDetail = false" class="text-gray-600">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { computed, ref, reactive, onUnmounted, onMounted } from 'vue'
import { uuid } from 'vue-uuid';
import { marked } from 'marked'
const STORAGE_KEY = 'vue-memo'
const dialogFormVisible = ref(false)
const dialogDetail = ref(false)
const textarea = ref('')
const form = reactive({
    id: "",
    date: "",
    name: "",
    detail: "",
    kind: "",
    tag: ""
})
const formLabelWidth = '140px'
interface Memo {
    id: string
    date: string
    name: string
    detail: string
    kind: string
    tag: string
}

const search = ref('')
const output = computed(() => marked(form.detail))
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const filterTag = (value: string, row: Memo) => {
    console.log(row)
    return row.tag === value
}
const handleEdit = (index: number, row: Memo) => {
    form.date = row.date
    form.name = row.name
    form.detail = row.detail
    form.kind = row.kind
    form.tag = row.tag
    form.id = row.id
    dialogFormVisible.value = true
}
const handleDelete = (index: number, row: Memo) => {
    console.log(index, row)
    tableData.forEach((item, index, arr) => {
            if (item.id == row.id) {
                arr.splice(index, 1)
            }
        })
}

const handleShow = (index: number, row: Memo) => {
    console.log(index, row)
    dialogDetail.value = true
    form.date = row.date
    form.name = row.name
    form.detail = row.detail
    form.kind = row.kind
    form.tag = row.tag
    form.id = row.id
}



// let tableData: Memo[] = reactive([
//     {
//         id: "1",
//         date: '2016-05-03',
//         name: 'Tom',
//         detail: "test",
//         kind: "study",
//         tag: "Inprogress"
//     },
//     {
//         id: "2",
//         date: '2016-05-03',
//         name: 'mariya',
//         detail: "test",
//         kind: "study",
//         tag: "Completed"
//     }
// ])
let tableData: Memo[] = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

let add_memo = () => {
    console.log(form)
    if (form.id) {
        tableData.forEach((item, index, arr) => {
            if (item.id == form.id) {
                arr.splice(index, 1)
                arr.splice(index, 0, {
                    id: form.id, date: "2016-05-03", name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
                })
            }
        })
        // tableData.push({
        //     id: form.id, date: "2016-05-03", name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
        // })
    } else {
        tableData.push({
            id: uuid.v1(), date: "2016-05-03", name: form.name, detail: form.detail, kind: form.kind, tag: form.tag
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
}

onUnmounted(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData))
})

onMounted(() => {
    let tableData = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
})

</script>
  