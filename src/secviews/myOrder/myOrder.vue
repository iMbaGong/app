<template>
    <div class="bg-white p-4 rounded">
        <el-row :gutter="24">
            <el-col v-for="order in orderList" :key="order" :xs="24" :sm="12" :md="8" class="mb-3">
                <el-card class="box-card rounded">
                    <div>
                        <div class="flex-item">
                            <div class="flex-label">{{order.Homestay.homestay_name}}</div>
                            <div class="flex-content">这个是房间名哈哈哈哈哈</div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">订单状态</div>
                            <div class="flex-content">
                                <el-tag>{{order.paying_status==1?"已付款":"未付款"}}</el-tag>
                            </div>
                        </div>
                        <div class="flex-item">
                            <div class="flex-label">创建时间</div>
                            <div class="flex-content">{{tranDate(order.create_time)}}</div>
                        </div>
                    </div>
                    <div class="text-right mt-2">
                        <el-button type="primary" size="small" @click="onViewOrder(order.order_id)">查看详情</el-button>
                        <el-button type="danger" size="small" @click="onCancelOrder(order.order_id)">取消订单</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination
                class="mt-4 text-right"
                background
                layout="total, prev, pager, next, sizes, jumper"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :total="+total"
                :current-page="currentPage"
                @current-change="onCurrentChange"
                @size-change="onSizeChange"
        />
    </div>
</template>

<script>
    import {getUserOrders} from "../../utils/api";
    import Moment from 'moment'
    import {getLocalUser} from "../../utils/common";

    export default {
        name: 'Order',
        data() {
            return {
                orderList: [],
                pageSize: 8,
                pageSizes: [8, 16, 24, 32],
                total: 0,
                currentPage: 1
            }
        },
        created() {
            this.getOrder()
        },
        methods: {
            // 获取订单列表
            getOrder() {
                // 发送请求
                let that = this
                getUserOrders(getLocalUser().user_name).then(res => {
                    that.orderList = res.data
                    console.log(res)
                }).catch(err => {
                    this.$message.error(err)
                })
            },
            // 当前页码改变
            onCurrentChange(currentPage) {
                this.currentPage = currentPage
                this.getList()
            },
            // 每页展示数量改变
            onSizeChange(pageSize) {
                this.pageSize = pageSize
                this.getList()
            },
            // 查看详情
            onViewOrder(id) {
                this.$router.push(`/myOrder/show/${id}`)
            },
            // 取消订单
            onCancelOrder(id) {
                this.$confirm('确定要取消订单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(id)
                    // 发送请求
                })
            },
            formatTime(time) {
                return time.split('T')[0]
            },
            tranDate: function (date) {
                return Moment(date).format(
                    "YYYY-MM-DD HH:mm:ss")

            },
        },


    }
</script>

<style lang="scss" scoped>
</style>
