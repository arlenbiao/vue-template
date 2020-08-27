<template>
  <div class="edit_container">
    <!--  新增时输入 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <el-upload
      class="avatar-uploader"
      action=""
      :http-request="to_upload_img"
      :show-file-list="false"
      style="display: none"
    >
      <i class="el-icon-plus avatar-uploader-icon" id="imgInput"></i>
    </el-upload>
    <!-- 从数据库读取展示 -->
    <div v-html="str" class="ql-editor">{{str}}</div>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: ``,
      str: '',
      addRange: {},
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    // 转码
    escapeStringHTML (str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    },
    to_upload_img (formdata) {
      return new Promise((resolve, reject) => {
        console.log(formdata)
        // upload_img(formdata).then(res => {
        //   // 图片的远程路径
        //   let value = res.key
        //   // 将图片添加到富文本内容区域
        //   this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        //   // 调用编辑器的 insertEmbed 方法，插入URL
        //   this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', value, Quill.sources.USER)
        // })
      })
    },
    // 点击图片ICON触发事件
    imgHandler (state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      console.log(this.addRange)
      if (state) {
        // 选择并上传一张图片
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
    }
  },

  mounted () {
    // let content = '' // 请求后台返回的内容字符串
    // this.str = this.escapeStringHTML(content)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  }
}
</script>
<style lang="scss" scoped>
</style>
