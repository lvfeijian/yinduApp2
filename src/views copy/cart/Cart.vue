<template>
<div>
    <navbar class="navbar">
        <div slot="center" class="shopCart">购物车({{$store.state.cartList.length}})</div>
    </navbar>
    <div v-for='item in $store.state.cartList' class="shop">
        <div class="choice">
            <div class="checked" :class="{check:item.checked}" @click.navtive="checkClick(item)"></div>
        </div>
        <div class="icon">
            <img :src="item.image" alt="">
        </div>
        <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="block">
                <div class="price">￥{{item.price}}</div>
                <div class="count">x{{item.count}}</div>
            </div>

        </div>
        
    </div>
    <CartBottomBar class="CartBottomBar"></CartBottomBar>
</div>
</template>
<script>
import navbar from '@/components/common/navbar/NavBar'
import CartBottomBar from './childCpn/CartBottomBar'

export default {
    name:'Cart',
    components:{
        navbar,
        CartBottomBar,
    },
    data() {
        return {
           
        }
    },
    methods: {
        checkClick(item){
            item.checked = !item.checked
        }
    },
    activated() {
    },
}
</script>
<style scoped>
    .navbar{
        background-color: #f00;
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
    
    .icon{
        width: 50px;
        height: 80px;
        overflow: hidden;
    }
    .icon img{
        width: 50px;
        height: 80px;
        
    }

    .shop{
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        top: 44px;
        height: 100px;
    }
    .info{
        width: 250px;
        
    }
    .info .block{
        width: 100%;
        display: flex;
        margin-top: 5px;
        justify-content: center;
        align-items: center;
    }
    .info .block .price{
        color: saddlebrown;
        font-size: 20px;
    }

    .info .block .count{
        flex: 1;
        text-align: right;
        margin-right: 5px;
    }

    .info .title{
        overflow:hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
    }
    .choice{
        width: 30px;
        display: flex;
        justify-content: center;
        align-self: center;
    }
    .choice .checked{
        width: 15px;
        height: 15px;
        
        border: 2px solid #ccc;
        border-radius: 50%;
    }
    .choice .check{
        background-color: #f00;
        border: 2px solid #f00;

    }
    .CartBottomBar{
        position: fixed;
        bottom:50px;
        left: 0;
        right: 0;
    }
</style>