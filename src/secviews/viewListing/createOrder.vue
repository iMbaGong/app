<template>
  <el-page-header @back="goBack" content="详情页面">
</el-page-header>
<el-descriptions class="margin-top" title="" :column="3" :size="size" border>
    <template #extra>
    </template>
    <!--民宿名称-->
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-user"
        prop="homestay_name"
        ></i>
        民宿名称
      </template>
      {{info.homestay_name}}
    </el-descriptions-item>
    <!--价格-->
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        价格
      </template>
      {{info.homestay_price+'元/晚'}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-location-outline"></i>
        位置
      </template>
      {{info.homestay_addr}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-tickets"></i>
        客容量
      </template>
      {{info.homestay_cap}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        民宿面积
      </template> 
      {{info.homestay_area}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        床数
      </template>
      {{info.bed_number}}
    </el-descriptions-item>
  </el-descriptions>
  <div style="margin: 10px 0;"></div>
    
</template>

<script>
 export default {
      data() {
        return {
            info:{
            homestay_id: 0,
            homestay_name: "嘉实接待中心",
            homestay_addr: "曹安公路4800号同济大学",
            homestay_cap: 4,
            homestay_area: 80.0,
            homestay_price: 1900.0,
            bed_number: 4.0,
        },
            methods: {
            //返回上一级
            goBack() {
                window.history.go(-1);
                console.log('go back');
            }
        }
        }
      }
    }
</script>