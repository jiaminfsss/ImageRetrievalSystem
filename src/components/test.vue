<template>
    <div id="app">
      <ul>
        <li
          ref='waterfallItem'
          v-for="(item,index) in waterfallArr"
          :key="index"
        >
          <img :src="item.img"> 第{{index+1}}张
          <span>原价 {{item.price}}</span>
          </li>
      </ul>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      waterfallArr: [
        {
          id: 1,
          img: require("./assets/images/1.jpg"),
          price: "50",
        },
        {
          id: 2,
          img: require("./assets/images/2.jpg"),
          price: "50",
        },
        {
          id: 3,
          img: require("./assets/images/3.jpg"),
          price: "50",
        },
        {
          id: 4,
          img: require("./assets/images/4.jpg"),
          price: "50",
        },
        {
          id: 5,
          img: require("./assets/images/5.jpg"),
          price: "50",
        },
        {
          id: 6,
          img: require("./assets/images/6.jpg"),
          price: "50",
        },
        {
          id: 7,
          img: require("./assets/images/5.jpg"),
          price: "50",
        },
        {
          id: 8,
          img: require("./assets/images/6.jpg"),
          price: "50",
        },
      ],
      array: [] //定义空数组存储元素高度
    };
  },
  mounted() {
   setTimeout(() => { // 防止图片高度没有加载出来
      this.getWaterfall();
   },100)
  },
  methods: {
    getWaterfall() {
      let columns = 2; //定义布局的列数为2
      let item = this.$refs.waterfallItem; //获取每个子元素的DOM
      console.log("item",item)
      for (let i = 0; i < item.length; i++) {
        //遍历整个子元素的DOM集合
        if (i < columns) {
          //小于columns的子元素作为第一行
          item[i].style.top = 20 + 'px';
          item[i].style.left = item[0].clientWidth * i + "px";
          console.log("offsetWidth", item[0].clientHeight)
          this.array.push(item[i].clientHeight); //遍历结束时，数组this.array保存的是第一行子元素的元素高度
          console.log("this.array",this.array)
        } else {
          //大于等于columns的子元素将作其他行
          let minHeight = Math.min(...this.array); //  找到第一列的最小高度
          let index = this.array.findIndex(item => item === minHeight) // 找到最小高度的索引
          //设置当前子元素项的位置
          item[i].style.top = this.array[index] +25+ "px"; 
          item[i].style.left = item[index].offsetLeft + "px";
          //重新定义数组最小项的高度 进行累加
          this.array[index]+= item[i].clientHeight
          console.log("this.array[index]",this.array[index])
        }
      }
    },
  },
};
</script>


 
<style lang="scss" scoped>
#app {
  width: 750px;
  height: 100vh;
  background-color: #0f0;
  color: #333;
  text-align: center;
  font-size: 20px;
  ul {
    width: 750px;
    height: 100%;
    list-style: none;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    li {
      width: 50%;
      height: auto;
      padding: 10px;
      font-size: 14px;
      position: absolute;
      box-sizing: border-box;
      margin: 0 0 10px 0;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
        height: auto;
      }
      span {
        text-decoration: line-through;
        line-height: 2;
        margin-left: 10px;
      }
    }
  }
}
</style>


