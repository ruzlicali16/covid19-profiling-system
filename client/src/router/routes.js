const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        alias: "/patient",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/patient/add-profile",
        component: () => import("pages/AddPatients.vue")
      },
      {
        path: "/patient/edit-profile/:id",
        component: () => import("pages/AddPatients.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
