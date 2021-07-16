<template>
  <div class="singleRoom">
    <div class="box">
      <el-row>
        <el-col :span="12"
          ><div>
            <h2>{{ form.name }}</h2>
          </div></el-col
        >
        <el-col :span="4"
          ><div style="position: relative; top: 15px">
            <el-button type="danger" round @click="dialogVisibleplus = true"
              >举报</el-button
            >
          </div></el-col
        >

          <el-col :span="4"
          ><div style="position: relative; top: 15px">
           <el-dropdown>
    <div style="position: relative; top: 15px">
      <el-avatar size="large" :src="circleUrl"></el-avatar>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-popover
          placement="bottom"
          title="用户昵称："
          :width="200"
          trigger="click"
          content="用户的昵称为li"
        >
          <template #reference>
            <el-dropdown-item>昵称</el-dropdown-item>
          </template>
        </el-popover>
        <el-popover
          placement="bottom"
          title="用户的信用分："
          :width="200"
          trigger="click"
          content="用户的信用分为：95"
        >
          <template #reference>
            <el-dropdown-item>信用分</el-dropdown-item>
          </template>
        </el-popover>

        <el-dropdown-item @click="dialogCommitVisble = true">
          交流</el-dropdown-item
        >

        <el-dropdown-item @click="dialogRoomVisible = true">名下房产</el-dropdown-item>
        <el-dialog title="我的民宿" v-model="dialogRoomVisible">
  <el-table :data="tableData">
    <el-table-column property="id" label="序号" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="info" label="信息"></el-table-column>
    <el-table-column property="address" label ="地址"></el-table-column>
  </el-table>
</el-dialog>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dialog title="交流" v-model="dialogCommitVisble">
    <el-form :model="form">
      <el-form-item label="交流名称" :label-width="formLabelWidth">
        <el-input v-model="form.desc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCommitVisble = false">取 消</el-button>
        <el-button type="primary" @click="dialogCommitVisble = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog></div
        ></el-col>
        <!-- <el-col :span="4"
          ><div style="position: relative; top: 15px">
            <el-avatar size="large" :src="circleUrl"></el-avatar></div
        ></el-col> -->
      </el-row>
    </div>
    <el-row :gutter="40">
      <el-col :span="12"
        ><div style="height: 400px; width: 600px; margin: 0 auto">
          <img
            :src="form.homestay_pic"
            alt=""
            style="width: 100%; height: 100%"
          >
          <div style="margin-top: 15px">
            <el-row :gutter="40">
              <el-col :span="12"
                ><div>民宿名称：{{ form.homestay_name }}</div></el-col
              >
              <el-col :span="12"
                ><div>民宿地址：{{ form.homestay_addr }}</div></el-col
              >
            </el-row>
            <el-row :gutter="40">
              <el-col :span="12"
                ><div>客人容量：{{ form.homestay_cap }}</div></el-col
              >
              <el-col :span="12"
                ><div>客床数量：{{ form.bed_number }}</div></el-col
              >
            </el-row>
            <el-row :gutter="40">
              <el-col :span="12"
                ><div>设施情况：{{ form.wifi===1?"有WiFi":"无WiFi" }}</div></el-col
              >
              <el-col :span="12"
                ><div>周边情况：{{ form.by_the_street===1?"临街":"不临街" }}</div></el-col
              >
            </el-row>
            <el-row :gutter="40">
              <el-col :span="24"
                ><div>房间简介：{{ form.homestay_info }}</div></el-col
              >
            </el-row>
          </div>
        </div></el-col
      >
      <el-col :span="4"
        ><div>
          <!-- <div class="rightDiv">价格：￥ 105.0</div>
                <div class="rightDiv"><el-button class="rightDiv">预定</el-button></div>
                <div class="rightDiv">时间：2021-09-09</div> -->
          <table>
            <tr width="150%">
              <import-table
                ref="importTable"
                @import-success="importSuccess"
              ></import-table>
              <el-button type="primary"
              icon="el-icon-folder-add"
              @click="collect"
                >收藏</el-button>
            </tr>
            <br />
            <tr>
              <export-table ref="exportTable"></export-table>
              <el-button type="primary" icon="el-icon-chat-dot-square"
                @click="dialogVisible = true">评论</el-button
              >
            </tr>
            <br />
            <tr>
              <el-button type="primary" 
              icon="el-icon-s-management
              
              ">预定</el-button>
            </tr>
            <br />
          </table></div
      ></el-col>
    </el-row>
    <el-dialog
      title="举报"
      v-model="dialogVisibleplus"
      width="50%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        placeholder="请输入具体原因"
        v-model="textarea"
        maxlength="30"
        show-word-limit
      >
      </el-input>
      <el-button :plain="true" @click="uploadw">提交</el-button>
      <el-button type="primary" @click="gotoadd">取消</el-button>
    </el-dialog>

    <el-dialog
      title="评分"
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span class="demonstration">请评分</span>
      <el-rate v-model="value2" show-text> :colors="colors"> </el-rate>

      <el-input
        type="textarea"
        placeholder="请输入具体评价内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
      >
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button :plain="true" @click="upload">提交</el-button>
          <el-button type="primary" @click="gotoadd">返回首页</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {addCommments, addFavor, getHomestayById} from "../../utils/api";
  import {getLocalUser} from "../../utils/common";

export default {
  name: "singleRoom",
  created(){
    getHomestayById(this.$route.params.id).then(res=>{
      this.form = res.data
    })
  },
  data() {
    return {
      dialogRoomVisible: false,
      dialogCommitVisble: false,
      form: {
      },
      formLabelWidth: "120px",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
           dialogVisible: false,
        dialogVisibleplus:false,
      
      textarea: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    };
  },
  methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       upload () {
      this.$message({
        message: '评价提交成功',
        type: 'success'
      })
    },
    gotoadd () {
      this.$router.replace('/')
    },
      uploadw () {
        //调用增加评论api
        //addCommments()
      this.$message({
        message: '举报提交成功',
        type: 'success'
      })
    },
    collect()
    {
      console.log('你点击了收藏按钮!');
      //添加收藏
      addFavor(getLocalUser().user_name,this.form.homestay_id).then(res=>{
        this.$message.success("收藏成功")
      })
      //然后根据返回值报一个添加收藏或取消收藏地信息
    }
  },
};
</script>
<style scoped class="less">
.singleRoom {
  padding: 0 15px;
}
.box {
  text-align: center;
}
.leftbutton {
  width: 150px;
  height: 100px;
  border-radius: 10px;
  background-color: #42b983;
  color: white;
  margin: 15px auto 0;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
}

.rightbutton {
  width: 150px;
  height: 100px;
  border-radius: 10px;
  background-color: #42b983;
  color: white;
  margin: 15px auto 0;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
}

.rightDiv {
  width: 150px;
  height: 100px;
  border-radius: 10px;
  background-color: #42b983;
  color: white;
  margin: 15px auto 0;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
}
</style>
