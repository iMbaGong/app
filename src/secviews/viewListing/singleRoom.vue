<template>
  <div class="singleRoom">
    <div class="box">
      <el-row>
      <!--展示房间名-->
        <el-col :span="12"
          ><div>
            <h2>{{ form.homestay_name }}</h2>
          </div></el-col
        >
        <!--显示评分,这里要从后端拉一下这个房间的评分，要调一下api-->
        <el-col :span="4"
          ><div style="position: relative; top: 15px"
          >
          <el-rate
            prop="grade"
            v-model="form.grade"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>

          </div></el-col
        >

          <el-col :span="4"
          ><div style="position: relative; top: 15px">
          <!--头像下拉-->
      <el-dropdown>
        <div style="position: relative; top: 15px">
          <el-avatar size="large" :src="circleUrl"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!--用户昵称-->
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
            <!--用户信用分-->
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
            <!--询问房东-->
            <el-dropdown-item @click="dialogCommitVisble = true">
              询问房东</el-dropdown-item
            >
            
            </el-dropdown-menu>
        </template>
  </el-dropdown>

    <!--询问房东-->
    <el-dialog
      title="询问"
      v-model="dialogCommitVisble"
      width="50%"
      :before-close="handleClose"
    >
    <el-input
        type="text"
        prop="session_type"
        placeholder="请输入标题"
        v-model="query.session_type"
        maxlength="14"
        show-word-limit
      >
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        prop="session_detail"
        type="textarea"
        placeholder="请输入问询内容"
        v-model="query.session_detail"
        maxlength="150"
        show-word-limit
      >
      </el-input>
      <div style="margin: 10px 0;"></div>
      <el-button :plain="true" @click="uploadq">提交</el-button>
      <el-button type="primary" @click="dialogCommitVisble=false">取消</el-button>
    </el-dialog>


      </div></el-col>
        <!-- <el-col :span="4"
          ><div style="position: relative; top: 15px">
            <el-avatar size="large" :src="circleUrl"></el-avatar></div
        ></el-col> -->
      </el-row>
    </div>
    <el-row :gutter="40">
      <el-col :span="12"
        ><div style="height: 200px; width: 300px; margin: 0 auto">
          <img
            :src="form.homestay_pic"
            alt=""
            style="width: 100%; height: 100%"
          >
          <div style="margin-top: 15px">
          <!--民宿详情-->
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="+基本信息" name="1">
              <div>民宿名称：{{ form.homestay_name }}</div>
              <div>民宿地址：{{ form.homestay_addr }}</div>
              <div>客人容量：{{ form.homestay_cap }}</div>
            </el-collapse-item>
            <el-collapse-item title="+设施情况" name="2">
              <div>客床数量：{{ form.bed_number }}</div>
              <div>网络环境：{{ form.wifi===1?"有WiFi":"无WiFi" }}</div>
            </el-collapse-item>
            <el-collapse-item title="+周边情况" name="3">
              <div>周边情况：{{ form.by_the_street===1?"临街":"不临街" }}</div>
            </el-collapse-item>
            <el-collapse-item title="+房间简介" name="4">
              <div>房间简介：{{ form.homestay_info }}</div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </div></el-col
      >
      <el-col :span="4"
        ><div>
          <!-- <div class="rightDiv">价格：￥ 105.0</div>
                <div class="rightDiv"><el-button class="rightDiv">预定</el-button></div>
                <div class="rightDiv">时间：2021-09-09</div> -->
          <table>
          <!--收藏按钮-->
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
            <!--预定按钮-->
            <tr>
              <el-button type="primary" 
              icon="el-icon-s-management">预定</el-button>
            </tr>
            <br />
            <!--查看评论按钮-->
            <tr>
              <el-button type="primary" 
              icon="el-icon-s-comment">评论</el-button>
            </tr>
            <br />
            <!--举报按钮-->
            <tr>
              <el-button type="danger" 
              icon="el-icon-warning"
              @click="dialogVisibleplus = true">举报</el-button>
            </tr>
          </table></div
      ></el-col>
    </el-row>
    <!--举报弹窗-->
    <el-dialog
      title="举报"
      v-model="dialogVisibleplus"
      width="50%"
      :before-close="handleClose"
    >
    <el-input
        type="text"
        prop="session_type"
        placeholder="请输入标题"
        v-model="appeal.session_type"
        maxlength="14"
        show-word-limit
      >
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        prop="session_detail"
        type="textarea"
        placeholder="请输入举报内容"
        v-model="appeal.session_detail"
        maxlength="150"
        show-word-limit
      >
      </el-input>
      <div style="margin: 10px 0;"></div>
      <el-button :plain="true" @click="uploadw">提交</el-button>
      <el-button type="primary" @click="dialogVisibleplus=false">取消</el-button>
    </el-dialog>

    
  </div>
</template>

<script>
  import {addCommments, addFavor, getHomestayById} from "../../utils/api";
  import {getLocalUser} from "../../utils/common";

export default {
  homestay_name: "singleRoom",
  created(){
    getHomestayById(this.$route.params.id).then(res=>{
      this.form = res.data
    })
  },
  data() {
    return {
      //举报信息
      appeal:{
        Sender:{
            user_name:"root1"
        },
        Receiver:{
            user_name:""
        },
        session_detail:"",
        session_type:""
    },
    //询问信息
    query:{
        Sender:{
            user_name:"root1"
        },
        Receiver:{
            user_name:""
        },
        session_detail:"",
        session_type:""
    },


      dialogCommitVisble: false,//控制询问房东窗口是否可见
      form: {
      },
      formLabelWidth: "120px",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
           dialogVisible: false,
           
        dialogVisibleplus:false,//控制举报窗口是否可见
      
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
      //提交举报信息
      uploadw () {
        //调用发起会话api，把举报信息发给一个公共管理员账号
        //...
      this.$message({
        message: '举报提交成功',
        type: 'success'
      })
    },
    //提交询问信息
      uploadq () {
        //调用发起会话api，把询问信息发给房东
        //...
      this.$message({
        message: '询问提交成功',
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
