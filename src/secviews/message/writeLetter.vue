<template>
  <div class="certificate-page bg-white p-4 rounded">
    <h3 class="mb-4 color-primary">发起会话</h3>
   <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="auto"
            class="demo-ruleForm"
          >
      <el-form-item label="收件人" prop="Receiver.user_name">
        <el-input v-model="ruleForm.Receiver.user_name" prefix-icon="el-icon-user" placeholder="请输入收件人" />
      </el-form-item>
      <el-form-item label="标 题 " prop="session_type">
        <el-input v-model="ruleForm.session_type"  
        placeholder="请输入标题"
        maxlength="14"
        show-word-limit 
        />
      </el-form-item>
      <el-form-item label="内 容" prop="session_detail">
        <el-input 
        type="textarea"
        v-model="ruleForm.session_detail" 
        prefix-icon="el-icon-folder-opened" 
        placeholder="请输入内容"
        maxlength="150"
        show-word-limit
         />
      </el-form-item>
      <el-form-item>
        <div class="text-right">
          <el-button type="primary"
          round 
          @click="onSubmit">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {sendSessions} from "../../utils/api";

export default {
  name: 'Cerificate',
  data() {
    return {
      ruleForm: {
        Sender:{
            user_name:''
        },
        Receiver:{
            user_name:''
        },
        session_detail:"",
        session_type:""
      },
       rules: {
        Receiver:{
            user_name:[
          { required: true, message: "请输入收件人", trigger: "blur" },
          
        ],
        },
         session_type: [
          { required: true, message: "请输入标题", trigger: "blur" },
           {
            min: 1,
            max: 14,
            trigger: "blur",
          },
        ],

         session_detail: [
          { required: true, message: "请选择内容", trigger: "blur" },
          {
              min:1,
              max:150,
              trigger:"blur"
          }
        ],

        },

        
    }
  },
  methods: { 
    onSubmit() {
      this.$confirm('确定要发送吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        //调用api接口
        //...
          sendSessions(this.ruleForm).then(res=>{
              this.$message.success("发送成功")
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .certificate-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 700px;
      padding: 50px 120px;
      border: 1px solid #efefef;
      border-radius: 8px;
    }
  }
</style>
