<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  data() {
    return {
      userId:'',
      routes:[],
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
    getRoutes(){
      this.routes = this.$router.options.routes
    },
  },
  async mounted() {
    let param = JSON.parse(this.commonJs.getStore(this.constants.userInfo));
    this.userId = param.id;
    this.getRoutes();
  },
  beforeCreate() {
    this.commonJs.parseCurrentPageParams(this);
  },
}
</script>
