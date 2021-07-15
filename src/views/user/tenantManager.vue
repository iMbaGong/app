<template>
  <el-container>
    <el-main>
      <el-table
        :data="
          tableData.filter(
            (data) => !search || String(data.user_id).startsWith(search)
          )
        "
        style="width: 70%"
        class="tableData"
      >
        <el-table-column type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div>
                <el-form-item label="客户昵称：">
                  <span class="element">{{ props.row.user_name }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户邮箱：">
                  <span class="element">{{ props.row.customer_email }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户 ID：">
                  <span class="element">{{ props.row.user_id }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户手机：">
                  <span class="element">{{ props.row.customer_phone }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="真实姓名：">
                  <span class="element">{{ props.row.customer_realname }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户性别：">
                  <span class="element">{{
                    props.row.customer_gender ? "男" : "女"
                  }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <!--客户id-->
        <el-table-column label="客户 ID" prop="user_id" text-align:center>
        </el-table-column>
        <!--客户昵称-->
        <el-table-column label="客户昵称" prop="user_name" text-align:center>
        </el-table-column>
        
        <!--信用分修改-->
        <el-table-column label="信用分修改" align="center" class="element">
          <template #default="scope" class="element">
            <el-input-number
              v-model="scope.row.tenant_credit"
              @change="onCreditChange(scope.row.user_name,scope.row.tenant_credit)"
              :min="0"
              :max="100"
              label="信用分"
            ></el-input-number>
          </template>
        </el-table-column>
        <!--搜索框-->
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入用户id号搜索"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getAllUser,changeUserCredit } from "utils/api";
export default {
  created: function () {
    getAllUser().then((r) => {
      r.data.forEach((item) => {
        const {
          customer_email,
          customer_phone,
          customer_realname,
          customer_gender,
          customer_identity,
        } = item.Customer;
        const {user_id,user_name} = item;

        const { tenant_credit } = item.Customer.Tenant;
        const house_num = 2;
        this.tableData.push({
          user_id,
          user_name,
          customer_email,
          customer_phone,
          customer_realname,
          customer_gender,
          customer_identity,
          tenant_status:0,
          tenant_credit,
          house_num,
        });
      });
    });
  },
  data() {
    return {
      url: "",
      urlList: [],
      timer: null,
      tableData: [],
      search: "",
    };
  },
  methods: {
    onStatusChange() {
      //缺少修改租客状态的api
    },
    onCreditChange(user_name,credit) {
      //调用修改信用分的api
      changeUserCredit(user_name,credit);
    },
  },
};
</script>

<style scoped>
.tableData {
  left: 10%;
}
.element {
  height: 30px;
}
</style>