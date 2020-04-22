# Project 2
+ By: Paul Ang
+ Production URL: <https://p2.paulang.rocks/>

## Pages summary
- [Home Page View](https://p2.paulang.rocks/) : Main Page. Mostly a landing page, waiting for more functions.
- [Day View](https://p2.paulang.rocks/day): Most of the development has occurred here. From you we can add shifts and add people to shifts.
- [Weekly View](https://p2.paulang.rocks/week): A weekly overview of the shifts. View only.
- [Monthly View](https://p2.paulang.rocks/month): A monthly overview of the shifts. Again View only.
- [Employees View](https://p2.paulang.rocks/employee): A overview of all the employees of the company, probably as part of a manager page, can add employees.
- [User View](https://p2.paulang.rocks/user): A landing page, waiting for `auth` modules to complete.
- [Admin Seed Page](https://p2.paulang.rocks/adminseed): Mainly for development use, to seed the database.

## SFC summary
### SFC used in Pages
- [Home Page View](https://github.com/punggolzenith/e28/blob/master/p2/src/components/HomeView.vue) : [`HomeView.vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/HomeView.vue)
- [Day View](https://p2.paulang.rocks/day): [`DayView.Vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/DayView.vue)
- [Weekly View](https://p2.paulang.rocks/week): [`WeekView.Vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/WeekView.vue)
- [Monthly View](https://p2.paulang.rocks/month): [`MonthView.Vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/MonthView.vue)
- [Employees View](https://p2.paulang.rocks/employee): [`EmployeesView.Vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/EmployeesView.vue)

### SFC not used in Pages
- [`ShowEmployee.Vue`](https://github.com/punggolzenith/e28/blob/master/p2/src/components/ShowEmployee.vue) : Renders each employee as a little circle.
  
## Server interaction
`shift` collections in firestore, is a real world shift typically starting and ending within a day. Each shift is typically 5 to 8 hours. The `staff` collection maps to a real world group of employees who can be rostered to work at this location. 

The application can now `create shift`, `delete shift`, `update employees who are rostered to the shifts` and `add employees`.

## Outside resources
- [Bootstrap CSS](https://getbootstrap.com/) and [Bootstrap-Vue](https://bootstrap-vue.js.org/). I am not exactly sure how I can just use bootstrap alone in the webpack, so I just included the Bootstrap-Vue.
- [Vue Router](https://router.vuejs.org/) for routing pages.
- [Moment](https://momentjs.com/), amazing library for managing datetime objects.
- [vuejs-datepicker](https://www.npmjs.com/package/vuejs-datepicker), amazing library for making date pickers.
- [Vuetify](https://vuetifyjs.com/), another amazing library recommended by my wonderful classmates, the `v-calendar` component was heavily used.
- [Lodash](https://lodash.com/), another amazing JS library learnt from Professor @susanBuck.

## My own notes for the design process
I am building an application to help roster nurses to work. I am now focusing on the admin views first, before the user views.

### Project requirements (for myself)
- Auth, Users, Permissions
- SMS/Email integration
- Generate reports
- Auto allocate shifts based on past patterns
- Distinguish between weekdays/weekends/holidays (perhaps find out which days are holidays automatically)

### Focus on the MVP
- Front end
- Admin View only
- Minimum pages: Calender View, Day View, Shift details view
- Stretch goals: Employee View

### Known bugs
- [Vuetify calendar components throws an error in the console](https://github.com/vuetifyjs/vuetify/issues/9999
)
- Shift across days currently not be supported

### TODOs
- Drag and drop of the employee onto the shift options: 
   * [Native JS events](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
   * [Vue Draggable](https://github.com/SortableJS/Vue.Draggable)
   * [Sortable JS](https://github.com/SortableJS/Sortable)
- Wire up all the clicks on the weekly and monthly views. But first, have to consult the documentations about `v-calendar`.
- Image upload, to upload employee profiles
- Image to appear on the Calendar event when employee is rostered
- When the data base grows, instead of retrieving all the shifts, need to filter the shifts according to today date and perhaps cache the rest.
- Update Shift details
- Update employee details
- Auth modules
- Remove employee from shift