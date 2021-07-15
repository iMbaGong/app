<template>
  <div class="collArea">
    <el-row gutter="6">
      <el-col :span="6" :offset="3" v-for="favor in favors">
        <el-card shadow="hover" class="collCard">
          <div class="collTitle">宝藏民宿
            <el-button
                class="delBtn"
                @click="deleteFavor(favor.id,index)"
                type="text"
                style="color: rgb(74,144,226)"
                font-size="large"
            >移出收藏夹</el-button>
          </div>
          <el-divider>
          </el-divider>
          <el-form
            :model="collForm"
            ref="collForm"
            class="CollForm">
            <div class="main1">
              <el-tree :data="favor.info" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <el-divider>
            </el-divider>
            <el-image
              class="homestayPic" :src="favor.pic" fit="contain"/>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {delFavor, getUserFavor} from "../../utils/api";
import {getLocalUser} from "../../utils/common";

export default {
  created()
  {
    getUserFavor(getLocalUser().user_name).then(res=>{
      res.data.forEach(item=>{
        this.favors.push({
          pic:item.homestay_pic,
          id:item.homestay_id,
          info:[{
            label: '名字',
            children: [{
              label: item.homestay_name
            }]
          }, {
            label: '地址',
            children: [{
              label: item.homestay_addr
            }]
          }, {
            label: '其他信息',
            children: [{
              label: '简介',
              children: [{
                label: item.homestay_info
              }]
            }, {
              label: '房间容量',
              children: [{
                label: item.homestay_cap
              }]
            },
              {
                label: '房间面积',
                children: [{
                  label: item.homestay_area
                }]
              },
              {
                label: '房间价格',
                children: [{
                  label: item.homestay_price
                }]
              },
              {
                label: '是否临街',
                children: [{
                  label: item.by_the_street===1?"是":"否"
                }]
              },
              {
                label: '有无WiFi',
                children: [{
                  label: item.wifi===1?'提供WiFi':"否"
                }]
              },
              {
                label: '有无浴缸',
                children: [{
                  label: item.bathtub===1?'提供浴缸':"否"
                }]
              },
              {
                label: '床数',
                children: [{
                  label: item.bed_number
                }]
              }]
          }]
        })
      })

    })
  },
  name: 'collection',
  data () {
    return {
      favors:[],

      defaultProps: {
        children: 'children',
        label: 'label'
      },

    }
  },
  methods: {
    gotoadd () {
      this.$router.replace('/')
    },
    deleteFavor(id,index){
      delFavor(getLocalUser().user_name,id).then(res=>{
        this.$message.success('删除成功')
        this.favors.splice(index,1)
      })
    }
  }
}
</script>
<!--<script>-->
// import {reactive} from 'vue'
// import {delFavor} from '../../utils/api';
// export default {
//   name: 'collection',
//   created:function()
//   {
//     //根据user_name获取用户收藏信息
//
//   },
//   let collForm=reactive({
//     user_name:'',
//     //……
//   })
//   return{
//
//   }
// }
//   methods:{
//       delFavor(this.collForm.homestay_id,this.collForm.username){
//         .then(res=>{
//           console.log(res)
//           this.$notify({
//             title: '删除成功',
//             showClose:false,
//             duration:1000,
//             type: 'success',
//       //更新界面
//         })
//       }.catch(err=>{
//         //报错
//       })
//   }
// }
<!--</script>-->

<style scoped lang="less">
.collArea{
  height: 100vh;
  background: linear-gradient(to left, #ddd6f3, #faaca8);
  .collTitle{
    text-align: left;
    font-size: 25px;
    font-weight: 900;
    margin: 0 0 30px 0;
  }
  .collCard{
    margin-top: 30%;
    background-color: rgba(255,255,255,0.8);
    box-shadow: white;
  }
  .delBtn{
    font-size: 15px;
    float: right;
    font-weight: 100;
    margin: 0 30px 0 0;
  }
  .collForm {
    margin-top: 1px;

    .homestayName {
      text-align: center;
      height: 25px;
      border-radius: 10px;
    }

    .main1 {

    }

    .main2 {

    }

    .homestayPic {
      display: block;
      margin: 0 auto;
      border-radius: 0;
      height: 100px;
      width: 100%;
    }
  }
}
</style>
