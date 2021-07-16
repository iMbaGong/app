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
        <!--评论者列-->
          <el-table-column
                label="评论者"
                prop="user_name"
                sortable
                align="center"
                class="element"
                width="180"
          >
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top">
                <template #default>
                  <p class="element">评论者: {{ scope.row.Receiver.user_name }}</p>
                  <p class="element">用户 ID: {{ scope.row.Receiver.user_id }}</p>
                </template>
                <template #reference>
                  <div class="user_name-wrapper">
                    <el-tag size="medium">{{ scope.row.Receiver.user_name }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
        
          <!--评论时间-->
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



          <!--查看评论-->
          <el-table-column
            prop="session_status"
            label="查看评论"
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
          <!--评分-->
            <el-table-column label="评分">
                <template #default="scope">
                    <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                    </el-rate>
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

        comment:{
            order_id:1,
            grade:4.4,
            detail:"评论内容"
    }

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