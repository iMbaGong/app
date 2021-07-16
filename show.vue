<template>
  <div class="orderArea">
    <el-row gutter="6">
      <el-col :span="10" :offset="2" >
      <el-card :offset="1" shadow="hover" class="box">
      <div class="orderTitle">详细信息
        <el-button
            class="ReturnBtn"
            ref="ReturnBtn"
            @click="returnBack()"
            type="text"
            style="color: rgb(74,144,226)"
            font-size="large"
        >返回我的订单</el-button>
      </div>
      <el-divider>
      </el-divider>
      <el-form
          :model="orderForm"
          ref="orderForm"
          class="orderForm">
        <el-card class="flex-item">
          <div class="name">民宿名称：</div>
          <div class="value">{{order.Homestay.homestay_name}}</div>
        </el-card>
        <el-card class="flex-item">
          <div class="name">民宿地址：</div>
          <div class="value">
            {{order.Homestay.homestay_addr}}
          </div>
        </el-card>
        <el-card class="flex-item">
          <div class="name">房东电话：</div>
          <div class="value">{{order.Landlord.Customer.customer_phone}}</div>
        </el-card>
          <el-card class="flex-item">
            <div class="name">房东姓名：</div>
            <div class="value">{{order.Landlord.Customer.customer_realname}}</div>
          </el-card>
          <el-card class="flex-item">
            <div class="name">单价：</div>
            <div class="value">
              {{order.Homestay.homestay_price}}
            </div>
          </el-card>
          <el-card class="flex-item">
            <div class="name">数量：</div>
            <div class="value">{{order.Homestay.homestay_cap}}</div>
          </el-card>
          <el-card class="flex-item">
            <div class="name">总价：</div>
            <div class="value">{{order.payings}}</div>
          </el-card>
          <el-card class="flex-item">
            <div class="name">订单状态：</div>
            <div class="value">
              <el-tag>{{order.paying_status==1?"已付款":"未付款"}}</el-tag>
            </div>
          </el-card>
        <el-card class="flex-item">
          <div class="name">入住时间：</div>
          <div class="value">
            {{order.start_time}}
          </div>
        </el-card>
        <el-card class="flex-item">
          <div class="name">退房时间：</div>
          <div class="value">{{order.expire_time}}</div>
        </el-card>
          <el-divider>
          </el-divider>
        </el-form>
      </el-card >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOrderById} from "../../utils/api";

export default {
  name: 'OrderDetail',
  created(){
    getOrderById(this.$route.params.id).then(res=>{
      this.order = res.data
      console.log(this.order)
    })
  },
  data() {
    return {
      order:{
        start_time:"",
        expire_time:"",
        payings: 2800,
        paying_status:"",
        Homestay:{
          homestay_name: "",
          homestay_addr: "",
          homestay_price: 1400,
          homestay_cap: 2,
        },
        Landlord:{
          Customer:{
            customer_realname: "",
            customer_phone:"",
          }
        }
      }
    }
  },
  methods:{
    returnBack()
    {
      this.$router.replace('/myOrder');
    }
  }
}
</script>

<style scoped lang="less">
.orderArea {
  //margin-top: 0%;
  height: 100vh;
  background: linear-gradient(to bottom, #EDE574, #E1F5C4);

  .box {
    background-color: rgb(183, 209, 235);
    box-shadow: white;
  }

  .orderTitle {
    text-align: left;
    font-size: 25px;
    font-weight: 900;
    margin: 0 0 30px 0;
  }
  .ReturnBtn{
    font-size: 15px;
    float: right;
    font-weight: 100;
    margin: 0 30px 0 0;
  }

  .orderForm {
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: white;

    .flex-item {
      height: 60px;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: white;

      .name {
        text-align: left;
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 30px 0;
        display: inline-block;
      }

      .value {
        text-align: right;
        font-size: 15px;
        font-weight: 100;
        margin: 0 0 30px 0;
        display: inline-block;
      }
    }

    .returnBtn {
      float: left;
      margin-top: -30px;
      margin-bottom: 20px;
      border-radius: 3px;
    }
  }
}
</style>
