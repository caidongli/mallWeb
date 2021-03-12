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
      <sidebar-item :menus="menus"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { queryMenuListByU } from '@/api/menu'

export default {
  data() {
    return {
      menus:[],
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
    getMenus(){
      queryMenuListByU().then(res => {
        if (res.code === 0) {
          this.menus = res.data;
          console.log(this.menus)
        }
      }).catch(() => {
        this.$message.error('獲取菜單错误!');
      })
    },
  },
  async mounted() {
    this.getMenus();
  },
  beforeCreate() {
    this.commonJs.parseCurrentPageParams(this);
  },
}
</script>
