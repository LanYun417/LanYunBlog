<template>
  <!-- 数据面板 -->
  <el-row>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="p-1">
      <el-card shadow="hover">
        <el-badge :value="homeData.todayArticleCount">
          <el-text type="primary" size="large">文章总量</el-text>
          <br />
          <el-text type="success">{{ homeData.articleCount }}</el-text>
        </el-badge>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="p-1">
      <el-card shadow="hover">
        <el-badge :value="homeData.todaySiteViewCount">
          <el-text type="primary" size="large">站点访问量</el-text>
          <br />
          <el-text type="success">{{ homeData.siteViewCount }}</el-text>
        </el-badge>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="p-1">
      <el-card shadow="hover">
        <el-badge :value="homeData.todayTagCount">
          <el-text type="primary" size="large">标签数量</el-text>
          <br />
          <el-text type="success">{{ homeData.tagCount }}</el-text>
        </el-badge>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" class="p-1">
      <el-card shadow="hover">
        <el-badge :value="homeData.todayArticleViewCount">
          <el-text type="primary" size="large">文章浏览量</el-text>
          <br />
          <el-text type="success">{{ homeData.articleViewCount }}</el-text>
        </el-badge>
      </el-card>
    </el-col>
  </el-row>
  <!-- 客户端页面 -->
  <el-row>
    <div class="w-full p-1">
      <el-card shadow="hover">
        <iframe class="w-full h-[680px]" :src="homeData.siteUrl" frameborder="0"></iframe>
      </el-card>
    </div>
  </el-row>
</template>

<script name="Home" lang="ts" setup>
import { useHomeStore } from '@/stores/homeStore';

const homeStore = useHomeStore();
const homeData = computed(() => homeStore.homeData);
</script>
