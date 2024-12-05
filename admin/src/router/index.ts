import { ElMessage } from 'element-plus';
import { loginApi } from '@/api/api.user';
import BaseLayout from '@/views/index.vue';
import { localStorageGet } from '@/utils/u.localStorage';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: BaseLayout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页',
            icon: 'HomeFilled'
          }
        },
        {
          path: '/clientManage',
          name: 'ClientManage',
          component: () => import('@/views/ClientManage/index.vue'),
          children: [
            {
              path: 'siteManage',
              name: 'SiteManage',
              component: () => import('@/views/ClientManage/SiteManage/index.vue'),
              meta: {
                title: '站点管理',
                icon: 'Menu'
              }
            },
            {
              path: 'authorManage',
              name: 'AuthorManage',
              component: () => import('@/views/ClientManage/AuthorManage/index.vue'),
              meta: {
                title: '作者管理',
                icon: 'Menu'
              }
            }
          ],
          meta: {
            title: '客户端管理',
            icon: 'HelpFilled'
          }
        },
        {
          path: '/articleManage',
          name: 'ArticleManage',
          component: () => import('@/views/ArticleManage/index.vue'),
          meta: {
            title: '文章管理',
            icon: 'Management'
          }
        },
        {
          path: '/tagManage',
          name: 'tagManage',
          component: () => import('@/views/TagManage/index.vue'),
          meta: {
            title: '标签管理',
            icon: 'StarFilled'
          }
        },
        {
          path: '/leaveMessage',
          name: 'LeaveMessage',
          component: () => import('@/views/LeaveMessage/index.vue'),
          meta: {
            title: '留言管理',
            icon: 'Comment'
          }
        },
        {
          path: '/categoryManage',
          name: 'CategoryManage',
          component: () => import('@/views/CategoryManage/index.vue'),
          children: [
            {
              path: 'mainCategory',
              name: 'MainCategory',
              component: () => import('@/views/CategoryManage/MainCategory/index.vue'),
              meta: {
                title: '一级分类',
                icon: 'Menu'
              }
            },
            {
              path: 'secCategory',
              name: 'SecCategory',
              component: () => import('@/views/CategoryManage/SecCategory/index.vue'),
              meta: {
                title: '二级分类',
                icon: 'Menu'
              }
            }
          ],
          meta: {
            title: '分类管理',
            icon: 'Grid'
          }
        },
        {
          path: '/userManage',
          name: 'UserManage',
          component: () => import('@/views/UserManage/index.vue'),
          children: [
            {
              path: 'adminUser',
              name: 'AdminUser',
              component: () => import('@/views/UserManage/AdminUser/index.vue'),
              meta: {
                title: '后台用户',
                icon: 'Menu'
              }
            }
          ],
          meta: {
            title: '用户管理',
            icon: 'UserFilled'
          }
        },
        {
          path: '/fileManage',
          name: 'FileManage',
          component: () => import('@/views/FileManage/index.vue'),
          children: [
            {
              path: 'allFile',
              name: 'AllFile',
              component: () => import('@/views/FileManage/AllFile/index.vue'),
              meta: {
                title: '所有文件',
                icon: 'Menu'
              }
            },
            {
              path: 'imageManage',
              name: 'ImageManage',
              component: () => import('@/views/FileManage/ImageManage/index.vue'),
              meta: {
                title: '图片管理',
                icon: 'Menu'
              }
            },
            {
              path: 'photosManage',
              name: 'PhotosManage',
              component: () => import('@/views/FileManage/PhotosManage/index.vue'),
              meta: {
                title: '相册管理',
                icon: 'Menu'
              }
            }
          ],
          meta: {
            title: '文件管理',
            icon: 'Files'
          }
        },
        {
          path: '/friendlyLinkManage',
          name: 'FriendlyLinkManage',
          component: () => import('@/views/FriendlyLinkManage/index.vue'),
          meta: {
            title: '友链管理',
            icon: 'Link'
          }
        },
        {
          path: '/accessRecord',
          name: 'AccessRecord',
          component: () => import('@/views/AccessRecord/index.vue'),
          meta: {
            title: '访问记录',
            icon: 'Guide'
          }
        },
        {
          path: '/systemManage',
          name: 'SystemManage',
          component: () => import('@/views/SystemManage/index.vue'),
          meta: {
            title: '系统管理',
            icon: 'Tools'
          }
        },
        {
          path: '/iconList',
          name: 'IconList',
          component: () => import('@/views/IconList/index.vue'),
          meta: {
            title: '图标列表',
            icon: 'ElementPlus'
          }
        },
        {
          path: '/personalCenter',
          name: 'PersonalCenter',
          component: () => import('@/views/PersonalCenter/index.vue'),
          meta: {
            title: '个人中心',
            hidden: true
          }
        },
        {
          path: '/permissionManage',
          name: 'PermissionManage',
          component: () => import('@/views/PermissionManage/index.vue'),
          meta: {
            title: '权限管理',
            hidden: true
          }
        },
        {
          path: '/publishArticle',
          name: 'PublishArticle',
          component: () => import('@/views/PublishArticle/index.vue'),
          meta: {
            title: '发布文章',
            hidden: true
          }
        },
        {
          path: '/editArticle',
          name: 'EditArticle',
          component: () => import('@/views/EditArticle/index.vue'),
          meta: {
            title: '编辑文章',
            hidden: true
          },
          beforeEnter(to, from, next): void {
            if (!to.query.id) {
              next({
                name: '404'
              });
              return;
            }
            next();
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404/index.vue'),
      meta: {
        title: '404'
      }
    }
  ]
});

// 判断是否已登录
const isLogin = (to: any): boolean => {
  const token: string | null = localStorageGet('token');

  if (!token && to.path !== '/login') {
    return false;
  } else {
    return true;
  }
};

router.beforeEach((to, from, next) => {
  if (isLogin(to)) {
    next();
  } else {
    ElMessage.warning('请先登录');
    next('/login');
  }
});

export default router;
