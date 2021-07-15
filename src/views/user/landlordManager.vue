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
                  <span class="element">{{
                    props.row.customer_realname || ""
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户邮箱：">
                  <span class="element">{{
                    props.row.customer_email || ""
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户 ID：">
                  <span class="element">{{
                    props.row.customer_identity || ""
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户手机：">
                  <span class="element">{{
                    props.row.customer_phone || ""
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="真实姓名：">
                  <span class="element">{{
                    props.row.customer_realname || ""
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="客户性别：">
                  <span class="element">{{
                    props.row.customer_gender ? "男" : "女"
                  }}</span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="民宿数量：">
                  <span class="element">{{ props.row.house_num || "" }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <!--客户id-->
        <el-table-column label="房东 ID" prop="user_id" text-align:center>
        </el-table-column>
        <!--客户昵称-->
        <el-table-column
          label="房东昵称"
          prop="user_name"
          text-align:center
          class="element"
        >
        </el-table-column>
        <!--账号冻结-->
        <el-table-column label="账号冻结" align="center" class="element">
          <template #default="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.landlord_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="冻结"
              class="element"
              @change="onChange(scope.row.user_id,scope.row.landlord_status,scope.row.landlord_credit)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!--信用分修改-->
        <el-table-column label="信用分修改" align="center" class="element">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.landlord_credit"
              :min="0"
              :max="100"
              label="信用分"
              @change="onChange(scope.row.user_id,scope.row.landlord_status,scope.row.landlord_credit)"
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
              style="height=20px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getAllAdmin,changeLandloadInfo } from "utils/api";
export default {
  created: function () {
    getAllAdmin().then((r) => {
      r.data.forEach((item) => {
        const { user_id, user_name } = item;
        const {
          customer_email,
          customer_phone,
          customer_realname,
          customer_gender,
          customer_identity,
        } = item.Customer;
        const { landlord_status, landlord_credit } = item.Customer.Landlord;
        const house_num = 2;
        this.tableData.push({
          user_id,
          user_name,
          customer_email,
          customer_phone,
          customer_realname,
          customer_gender,
          customer_identity,
          landlord_status,
          landlord_credit,
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
    onChange(landlord_id,landlord_status,landlord_credit){
      changeLandloadInfo({
        landlord_id,
        landlord_status,
        landlord_credit
      })
    }
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