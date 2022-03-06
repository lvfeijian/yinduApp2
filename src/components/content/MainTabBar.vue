<template>
    <tab-bar>
        <tab-bar-item path="/home">
            <img src="@/assets/img/tabbar_icon/5.png" alt="" class="home" slot="item-icon">
            <img src="@/assets/img/tabbar_icon/1.png" alt="" class="home" slot="item-icon-active">
            <p slot="item-text">{{$t('page')}}</p>
        </tab-bar-item>
        <tab-bar-item path="/taskEnter">
            <img src="@/assets/img/tabbar_icon/6.png" alt="" class="task" slot="item-icon">
            <img src="@/assets/img/tabbar_icon/2.png" alt="" class="task" slot="item-icon-active">
            <p slot="item-text">{{$t('task')}}</p>
        </tab-bar-item>
        <tab-bar-item path="/profit">
            <img src="@/assets/img/tabbar_icon/7.png" alt="" class="profit" slot="item-icon">
            <img src="@/assets/img/tabbar_icon/3.png" alt="" class="profit" slot="item-icon-active">
            <p slot="item-text">{{$t('profit')}}</p>
        </tab-bar-item>
        <tab-bar-item path="/mine">
            <img src="@/assets/img/tabbar_icon/8.png" alt="" class="mine" slot="item-icon">
            <img src="@/assets/img/tabbar_icon/4.png" alt="" class="mine" slot="item-icon-active">
            <p slot="item-text">{{$t('mine')}}</p>
        </tab-bar-item>
        
    </tab-bar>
</template>
<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
    name:'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>
<style scoped>
img{
    vertical-align: center;
   
}
p{
    height: 12px;
    line-height: 16px;
}
    .home{
        width: 22px;
        height: 22px;
    }
    .task{
        width: 21px;
        height: 21px;
    }
    .profit{
        width: 22px;
        height: 20px;
    }
    .mine{
        width: 18px;
        height: 23px;
    }
</style>