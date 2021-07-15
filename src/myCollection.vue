<template>
  <div class="collArea">
    <el-row gutter="6">
      <el-col :span="6" :offset="3">
        <el-card shadow="hover" class="collCard">
          <div class="collTitle">宝藏民宿1
            <el-button
                class="delBtn"
                @click=deleteFavor(this.userInfo)
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
              <el-tree :data="data1" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <el-divider>
            </el-divider>
            <el-image
              class="homestayPic" :src="homestayPic1" fit="contain"/>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="6">
        <el-card shadow="hover" class="collCard">
          <div class="collTitle">宝藏民宿2
            <el-button
                class="delBtn"
                @click=deleteFavor(this.userInfo)
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
              class="CollForm"
          >
              <div class="main2">
                <el-tree :data="data2" :props="defaultfont-sizeProps" @node-click="handleNodeClick"></el-tree>
              </div>
              <el-divider>
              </el-divider>
              <el-image
                  class="homestayPic" :src="homestayPic2" fit="contain"/>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  created:function()
  {
    //获取用户收藏信息
    //getUserFavor()
  },
  name: 'collection',
  data () {
    return {
      data1: [{
        label: '名字',
        children: [{
          label: '嘉实招待中心'
        }]
      }, {
        label: '地址',
        children: [{
          label: '昌吉东路同济大学'
        }]
      }, {
        label: '其他信息',
        children: [{
          label: '简介',
          children: [{
            label: '嘉定地区比较不错的房子'
          }]
        }, {
          label: '房间容量',
          children: [{
            label: '2'
          }]
        },
          {
            label: '房间面积',
            children: [{
              label: '80'
            }]
          },
          {
            label: '房间价格',
            children: [{
              label: '2000'
            }]
          },
          {
            label: '是否临街',
            children: [{
              label: '是'
            }]
          },
          {
            label: '有无WiFi',
            children: [{
              label: '提供WiFi'
            }]
          },
          {
            label: '有无浴缸',
            children: [{
              label: '提供浴缸'
            }]
          },
          {
            label: '床数',
            children: [{
              label: '1'
            }]
          }]
      }],
      data2: [{
        label: '名字',
        children: [{
          label: '嘉实招待中心'
        }]
      }, {
        label: '地址',
        children: [{
          label: '昌吉东路同济大学'
        }]
      }, {
        label: '其他信息',
        children: [{
          label: '简介',
          children: [{
            label: '嘉定地区比较不错的房子'
          }]
        }, {
          label: '房间容量',
          children: [{
            label: '2'
          }]
        },
          {
            label: '房间面积',
            children: [{
              label: '80'
            }]
          },
          {
            label: '房间价格',
            children: [{
              label: '2000'
            }]
          },
          {
            label: '是否临街',
            children: [{
              label: '是'
            }]
          },
          {
            label: '有无WiFi',
            children: [{
              label: '提供WiFi'
            }]
          },
          {
            label: '有无浴缸',
            children: [{
              label: '提供浴缸'
            }]
          },
          {
            label: '床数',
            children: [{
              label: '1'
            }]
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      homestayPic1:require('@/assets/222.jpg'),
      homestayPic2:require('@/assets/333.jpg'),
    }
  },
  methods: {
    gotoadd () {
      this.$router.replace('/')
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
