<template>
  <div class="menu-wrapper">
    <template v-for="item in menus" v-if="item.isHidden != '1' && item.childList">

      <router-link v-if="hasOneShowingChildren(item.childList) && !item.childList[0].childList" :to="item.path+'/'+item.childList[0].path"
        :key="item.childList[0].name">
        <el-menu-item :index="item.path+'/'+item.childList[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.childList[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span v-if="item.childList[0].title" slot="title">{{item.childList[0].title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.childList" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.childList&&child.childList.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.title" slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    menus: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(childList) {
      const showingChildren = childList.filter(item => {
        return item.isHidden != '1'
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>
