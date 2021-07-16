<template>
  <div class="certificate-page bg-white p-4 rounded">
    <h3 class="mb-4 color-primary">实名认证</h3>
     <el-form ref="form" :model="form" label-width="auto">
     <!--用户名-->
      <el-form-item 
      label="用户名"
      prop="user_name"
      >
        <el-input v-model="form.user_name" :disabled='true' prefix-icon="el-icon-user" placeholder='' />
      </el-form-item>
      <!--邮箱-->
      <el-form-item 
      label="邮箱"
      prop="Customer.customer_email"
      >
        <el-input v-model="form.Customer.customer_email" :disabled='true' prefix-icon="el-icon-folder-opened" placeholder='请输入邮箱' />
      </el-form-item>
      <!--手机号-->
      <el-form-item 
      label="手机号"
      prop="Customer.customer_phone"
      >
        <el-input v-model="form.Customer.customer_phone" prefix-icon="el-icon-phone-outline" placeholder='请输入手机号' />
      </el-form-item>
      <!--身份证号-->
      <el-form-item 
      label="身份证号"
      prop="Customer.customer_identity"
      >
        <el-input v-model="form.Customer.customer_identity" :disabled='true' prefix-icon="el-icon-phone-outline" placeholder='请实名认证' />
      </el-form-item>
      <!--真实姓名-->
      <el-form-item 
      label="真实姓名"
      prop="Customer.customer_realname"
      >
        <el-input v-model="form.Customer.customer_realname" :disabled='true' prefix-icon="el-icon-phone-outline" placeholder='请实名认证' />
      </el-form-item>
      <!--性别-->
      <el-form-item 
      label="性别"
      prop="Customer.gender">
        <el-radio-group v-model="form.Customer.gender" >
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <!--实名认证&修改-->
      <el-form-item>
        <div class="text-right">
          <el-button type="primary" @click="onCertificate">实名认证</el-button>
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  created:function()
  {
    //这里需要获取name,email,phone,id等属性
    //getUserInfo()
  },
  name: 'Account',
  data() {
    return {
      form: {
        user_name: "root",
        Customer:{
            customer_email:"112233@qq.com",
            customer_phone:"1888888",
            customer_identity:"4503041999907121511",
            customer_realname:"张三",
            gender:0,
        },
        Admin:{
            invite_code:"BK2021"
    }
}

    }
  },
  methods: {
    // 去实名认证
    onCertificate() {
      this.$router.push('/verified')
    },
    onSubmit()
    {
      //提交修改
      //updateInfo()
    }
  }
}
</script>

<style>

.account-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
}
 .el-form {
    width: 700px;
    padding: 50px 120px;
    border: 1px solid #efefef;
    border-radius: 8px;
  }
</style>