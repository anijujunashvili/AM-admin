import { Outlet, Link, useLocation } from "react-router";
import { Layout, Menu, MenuProps, theme } from "antd";
import { logout } from "@/supabase/auth";
import { ADMIN_PATHS } from "@/routes/admin/enum";

const { Header, Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: `movies`,
    label: `Movies`,

    children: [
      {
        key: 1,
        label: <Link to={ADMIN_PATHS.MOVIES_LIST}>Movies</Link>,
      },
      {
        key: 2,
        label: <Link to={ADMIN_PATHS.MOVIES_GENRES}>Movie genres</Link>,
      },
      {
        key: 3,
        label: <Link to={ADMIN_PATHS.MOVIES_ACTORS}>Movie actors</Link>,
      },
    ],
  },
  {
    key: `actors`,
    label: <Link to={ADMIN_PATHS.ACTORS_LIST}>Actors</Link>,
  },
  {
    key: `news`,
    label: <Link to={ADMIN_PATHS.NEWS_LIST}>News</Link>,
  },
  {
    key: `reviews`,
    label: <Link to={ADMIN_PATHS.USER_REVIEWS}>User reviews</Link>,
  },
];

const DashboardLayout = () => {
  const location = useLocation();

  const selected = location.pathname.includes("news")
    ? "news"
    : location.pathname.includes("reviews")
      ? "reviews"
      : location.pathname.includes("actors")
        ? "actors"
        : "movies";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <div className="demo-logo" />
          <div style={{ cursor: "pointer" }} onClick={logout}>
            Logout
          </div>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[selected]}
                defaultOpenKeys={[selected]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
