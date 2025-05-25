import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading type={1} size="large">
          Dashboard
        </Heading>
        <DashboardFilter />
      </Row>
      <Row type="vertical">
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
