import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      options={[
        { field: '7', label: 'Last 7 days' },
        { field: '30', label: 'Last 30 days' },
        { field: '90', label: 'Last 90 days' },
      ]}
    />
  );
}

export default DashboardFilter;
