<template>
    <div class="certificate-page bg-white p-4 rounded">
        <h3 class="mb-4 color-primary">实名认证</h3>
        <el-form ref="form" :model="form" label-width="auto">
            <el-form-item label="昵称">
                <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder='请输入昵称'/>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" prefix-icon="el-icon-folder-opened" placeholder='请输入邮箱'/>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone" prefix-icon="el-icon-phone-outline" placeholder='请输入手机号'/>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男"/>
                    <el-radio label="女"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="form.identity" :disabled='true' prefix-icon="el-icon-phone-outline"
                          placeholder='请实名认证'/>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input v-model="form.realname" :disabled='true' prefix-icon="el-icon-phone-outline"
                          placeholder='请实名认证'/>
            </el-form-item>

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

    import {updateInfo} from "../../utils/api";

    export default {
        created: function () {
            //这里需要获取name,email,phone,id等属性
            //getUserInfo()
        },
        name: 'Account',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    phone: '',
                    identity: '',
                    realname: '',
                    sex: '',
                    imageUrl: ''
                }
            }
        },
        methods: {
            // 去实名认证
            onCertificate() {
                this.$router.push('/certificate/index')
            },
            onSubmit() {
                //提交修改
                updateInfo({
                    user_id: this.$store.state.user_id,
                    user_name: this.form.name,
                    Customer: {
                        customer_email: this.form.email,
                        customer_phone: this.form.phone,
                        gender: this.form.sex === "男" ? 1 : 0
                    }
                }).then(res => {
                    console.log(res)
                    this.$message.success('修改成功！')
                })
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