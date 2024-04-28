import { createRouter, createWebHistory } from 'vue-router'
import Join from "../components/join_page.vue"
import Reg from "../components/reg_page.vue"
import Main_page from "../components/main_page.vue"
import Profile from "../components/profile_element.vue"
import Welcome from "../components/hi_element.vue"
import My_class from "../components/my_classes_element.vue"
import Schedule from "../components/schedule_element.vue"
import Membership from "../components/membership_element.vue"
import Instructors from "../components/instructors_element.vue"

const routes = [
  {
    path: '/',
    name: 'join',
    component: Join
  },
  {
    path: '/register',
    name: 'Register',
    component: Reg
  },
  {
    path: '/main',
    name: 'Main Page',
    component: Main_page,
    children: [
      {
        path: 'welcome',
        name: 'Welcome page',
        component: Welcome
      },
      {
        path: 'my_classes',
        name: 'User classes',
        component: My_class
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: Schedule
      },
      {
        path: 'membership',
        name: 'Membership',
        component: Membership
      },
      {
        path: 'instructors',
        name: 'Instructors',
        component: Instructors
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
