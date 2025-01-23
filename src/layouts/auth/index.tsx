import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

const { Content } = Layout;

const AuthLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Content style={{ padding: "0 48px" }} className="h-svh">
        <div
          style={{
            background: colorBgContainer,
            display: "flex",
            marginTop: "150px",
            flexDirection: "column",
            minHeight: "350px",
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
