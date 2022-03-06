<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
#tab-bar{
    display: flex;
    align-items: center;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    box-shadow: 0px -2px 8px 0px rgba(233,232,232,0.5);
    z-index: 10;
}
 
</style>