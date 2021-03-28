<template>
    <div id="printCons" >
      <div class="blog-content" v-html="htmlData">
      </div>
    </div>
</template>
<script>
  import { printOrder} from '@/api/order'
  import print from 'print-js'
  import {current_page_params} from '@/utils/constant'
    export default {
        name: 'order-print',
        data() {
            return {
              htmlData:'',
              routeParams:{
                id:'',
              }
            }
        },

      created(){
        this.mounted();
        this.loadData();
      },
      beforeCreate() {
        this.commonJs.parseCurrentPageParams(this)
      },
        methods: {
          async mounted() {
            this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
          },
            loadData() {
              printOrder({id:this.routeParams.id}).then(res => {
                              if (res.code === 0) {
                                this.htmlData = res.data
                              }else {
                                this.$message.error(res.msg);
                              }
                            })
            },

            print(){
              printJS({
                printable: 'printCons',
                type: 'html',
                targetStyles: ['*'],
              })
            },
        },
        //与 上级组件通信

    }
</script>

