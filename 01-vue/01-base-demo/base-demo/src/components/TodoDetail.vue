<template>
    <el-dialog v-model="props.dialogDetail" title="Detail">
        <el-scrollbar class="h-96">
            <div id="detail" class="max-h-screen" v-html="output"></div>
        </el-scrollbar>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="$emit('close')">Cancel</el-button>
                <el-button type="primary" @click="$emit('close')" class="text-gray-600">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onUnmounted, onMounted } from 'vue'
import { uuid } from 'vue-uuid';
import { marked } from 'marked'
const props = defineProps(['detail', 'dialogDetail'])
const dialogDetail = ref(props.dialogDetail)
const output = computed(() => marked(props.detail))
</script>

<style>

#detail h1 {
    font-size: 2.5rem;
}

#detail h2 {
    font-size: 2rem;
}

#detail h1 {
    font-size: 2em;
    margin: .67em 0
}

#detail h2 {
    font-size: 1.5em;
    margin: .75em 0
}

#detail h3 {
    font-size: 1.17em;
    margin: .83em 0
}

#detail h4,
p,
blockquote,
ul,
fieldset,
form,
ol,
dl,
dir,
menu {
    margin: 1.12em 0
}

#detail h5 {
    font-size: .83em;
    margin: 1.5em 0
}

#detail h6 {
    font-size: .75em;
    margin: 1.67em 0
}

#detail h1,
h2,
h3,
h4,
h5,
h6,
b,
strong {
    font-weight: bolder
}

#detail pre code {
    color: red
}

#detail a {
    color: #42b983;
    font-weight: 600;
    padding: 0 2px;
    text-decoration: none;
}

#detail pre {
    padding-left: 12px;
    border-left: 2px solid #42b983;
}

</style>