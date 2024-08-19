const adminPaths2 = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: " <AdminDashboard />",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: "<CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "<CreateStudent />",
      },
    ],
  },
];

const newArray = adminPaths2.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: "NAVLINK",
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "navlink",
      })),
    });
  }
  return acc;
}, []);

console.log(JSON.stringify(newArray));
