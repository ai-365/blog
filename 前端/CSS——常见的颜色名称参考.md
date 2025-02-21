<script setup>
        const  items = [
                {text:'蔚蓝', color:'azure'},
                {text:'淡蓝', color:'lightblue'},
                {text:'爱丽丝蓝', color:'AliceBlue'},
                {text:'薰衣草', color:'lavender'},
                {text:'淡紫红', color:'LavenderBlush'},
                {text:'薄荷奶油', color:'MintCream'},
                {text:'白色烟雾', color:'WhiteSmoke'},
                {text:'薄雾玫瑰', color:'MistyRose'},
                {text:'蓟', color:'Thistle'},
                {text:'薄雾玫瑰', color:'MistyRose'},
                {text:'贝壳', color:'SeaShell'},
                {text:'桃', color:'PeachPuff'},
                {text:'兰花草', color:'Orchid'},
                {text:'旧蕾丝', color:'OldLace'},
                {text:'雪白', color:'Snow'},
                {text:'亚麻布', color:'Linen'},
                {text:'蜜露', color:'HoneyDew'},
                {text:'玉米色', color:'Cornsilk'},
                {text:'浅褐色', color:'Beige'},
        ]
</script>

# 常见的颜色名称参考
<br>

<div  id="container" >
    <div v-for="item in items"  :style="{background: item.color}" class="item"><span>{{item.text}}</span> <span> {{item.color}}</span></div>
</div>

<style scoped>
        #container{
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
        }

        .item{
                border-radius: 20px;
                min-width: 150px;
                min-height: 150px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }
</style>




