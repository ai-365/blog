<script setup>
    import { ref } from 'vue'
    const position = ref('top-center')
</script>

## 锚点定位示例
<br>
请选择一个位置：
<select v-model="position">
  <option disabled value="">Please select one</option>
  <option value="right-top">右上角</option>
  <option value="top-center">正上方</option>
  <option value="right-center">正右方</option>
</select>

<br>

<div class="container">
            <div class="anchor"></div>
            <div class="anchor-notice"  :class="position">
                    我是一个需要借助锚点定位的元素
            </div>
</div>



<style scoped>
        /* 锚点定位需要的关键属性： */

     .container {
          width: 500px;
          height: 200px;
          border: 1px solid black;
          position: relative;
       }
        .anchor{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: lightblue;
            margin-left: 150px;
            margin-top: 100px;
            position: absolute;
            anchor-name: --anchor-el;
        }

        .anchor-notice {
            width: fit-content;
            padding: 10px;
            border-radius: 10px;
            background: #DDD;

            position: absolute;
            position-anchor: --anchor-el;
        }

    /*  右上角 */
        .right-top{
            left: anchor(right);
            bottom: anchor(top);
        }

    /* 正上方 */
      .top-center{
            bottom: anchor(top);
            justify-self: anchor-center;
      }

      /* 正右方 */
      .right-center{
           left: anchor(right);
           align-self: anchor-center;
      }
</style>