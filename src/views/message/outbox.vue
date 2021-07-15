<template>
  <div class="main">
    <el-container>
      <el-main>
        <el-table
                :data="tableData"
                style="width: 70%"
                :default-sort="{ prop: 'create_time', order: 'descending' }"
                class="tableData"
                stripe='true'
                border
        >
          <!--送达时间-->
          <el-table-column
                  prop="create_time"
                  label="发送时间"
                  width="180"
                  sortable
                  column-key="create_time"
                  align="center"
                  class="element"
          >
            <template #default="scope">
              <i class="el-icon-time"></i>
              <span class="element" style="margin-left: 10px">{{
                tranDate(scope.row.create_time)
              }}</span>
            </template>
          </el-table-column>

          <!--收件人列-->
          <el-table-column
                  label="收件人"
                  prop="user_name"
                  sortable
                  align="center"
                  class="element"
                  width="180"
          >
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top">
                <template #default>
                  <p class="element">收件人名: {{ scope.row.Sender.user_name }}</p>
                  <p class="element">用户 ID: {{ scope.row.Sender.user_id }}</p>
                </template>
                <template #reference>
                  <div class="user_name-wrapper">
                    <el-tag size="medium">{{ scope.row.Sender.user_name }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <!--查看信息-->
          <el-table-column
                  prop="session_status"
                  label="查看信息"
                  align="center"
                  width="360"
                  class="element"
          >
            <template #default="scope">
              <el-button
                      class="element"
                      type="text"
                      v-bind:value="scope.row.session_status"
                      @click="open(scope.row)"
              >{{ showInfo(scope.row.session_detail) }}</el-button
              >
            </template>
          </el-table-column>
          <!--状态-->
          <el-table-column
                  class="element"
                  prop="session_status"
                  label="标签"
                  :filters="[
              { text: '已读', value: true },
              { text: '未读', value: false },
            ]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
          >
            <template #default="scope">
              <el-tag
                      :type="scope.row.session_status === false ? 'primary' : 'success'"
                      disable-transitions
              >{{ scope.row.session_status === true ? '已读' : '未读' }}</el-tag
              >
            </template>
          </el-table-column>

        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {getSendSessions} from "../../utils/api";
  import {getLocalUser} from "../../utils/common";
  import Moment from "moment"
  export default {
    created()
    {
      //获取所有发件的信息
      getSendSessions(getLocalUser().user_name).then(res=>{
        this.tableData = res.data
      })

    },
    data() {
      return {

        tableData: [
        ],
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter("date");
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.session_status === value;
      },
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
      open(row) {
        this.$alert(row.session_detail, row.session_type, {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      },
      //如果信息过长，则部分展示；而对于短信息则全部展示
      showInfo(msg) {
        if (msg.length <= 20) return msg;
        return msg.slice(0, 20) + "...";
      },
      tranDate: function (date) {
        return Moment(date).format(
                "YYYY-MM-DD HH:mm:ss")

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