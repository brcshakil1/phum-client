import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const USER_ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;

  switch (user!.role) {
    case USER_ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
      break;

    case USER_ROLE.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, USER_ROLE.FACULTY);
      break;

    case USER_ROLE.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <h2>Ph-University</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
