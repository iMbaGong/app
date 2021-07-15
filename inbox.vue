<template>
  <div class="main">
    <el-container>
      <el-main>
        <el-table
          :data="tableData"
          style="width: 85%"
          :default-sort="{ prop: 'create_time', order: 'descending' }"
          class="tableData"
          stripe='true'
          border
        >
          <!--发送时间-->
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
                scope.row.create_time
              }}</span>
            </template>
          </el-table-column>

          <!--发件人列-->
          <el-table-column
            label="发件人"
            prop="user_name"
            sortable
            align="center"
            class="element"
            width="180"
          >
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top">
                <template #default>
                  <p class="element">发件人名: {{ scope.row.user_name }}</p>
                  <p class="element">用户 ID: {{ scope.row.user_id }}</p>
                </template>
                <template #reference>
                  <div class="user_name-wrapper">
                    <el-tag size="medium">{{ scope.row.user_name }}</el-tag>
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
            width="180"
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
          <!--回信-->
          <el-table-column label="回信">
          <template #default="scope">

          <el-button type="text" @click="handleDialogOpening(scope.row)">回信</el-button>

          <el-dialog title="会话" 
          v-model="dialogFormVisible"
          >
            <el-input
              type="text"
              prop="reply.session_type"
              placeholder="请输入标题"
              v-model="reply.session_type"
              maxlength="14"
              show-word-limit
            >
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-input
              type="textarea"
              prop="reply.session_detail"
              placeholder="请输入内容"
              v-model="reply.session_detail"
              maxlength="150"
              show-word-limit
            >
            </el-input>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSession">发 送</el-button>
              </span>
            </template>
          </el-dialog>
            
          </template>
    </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  created:function()
  {
    //获取所有收件的信息
    //getSession()
  },
  data() {
    return {

      dialogFormVisible: false, //这个变量不要删掉，表示dialog的可见与否

      reply:
        {
            Sender:{
                user_name:'root1'
            },
            Receiver:{
                user_name:""
            },
            session_detail:"",
            session_type:""

        },

      tableData: [
        {
          //请把时间转换成这样的字符串
          create_time: "2016-05-02 08:00:00",
          user_name: "虎",
          user_id: 10000001,
          session_type:'投诉房东郑润哲',          
          session_detail:
            "这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的信息",
          session_status: true,
        },
        {
          create_time: "2016-05-04 08:00:00",
          user_name: "王小大幅的说",
          user_id: 10000002,
          session_type:'询问关于精品房的事项',
          session_detail: "这是一条信息",
          session_status: true,
        },
        {
          create_time: "2016-05-01 08:00:00",
          user_name: "王小虎",
          user_id: 10000003,
          session_type:'回复关于精品房的询问',
          session_detail: "这是一条信息",
          session_status: true,
        },
        {
          create_time: "2016-05-03 08:00:00",
          user_name: "王小虎",
          user_id: 10000004,
          session_type:'投诉租客奥特曼',
          session_detail: "这是一条信息",
          session_status: false,
        },
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
      //这一步的作用是实时更新显示的状态
      row.session_status = true;
      //可以在这里向服务器提交sesstion status的修改信息！！
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
    //处理会话窗口的打开，不要合并上去，会打不开的
    handleDialogOpening(row){
      var that=this;
      that.dialogFormVisible=true;
      //这里是为了获取reply中收件人和发件人的名字
      //但是以下两行代码不work，请修改
      that.$Sender.user_name=""//这里应该是用户名
      that.$Receiver.user_name=row.user_name;
    },
    submitSession(){
      var that=this;
      that.dialogFormVisible=false;
      //这里可以调用发送会话的api
      //...
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