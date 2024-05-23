import React, { useState, useEffect } from 'react';
import data from './home/jigs/Documents/myapp/Table.json';
import { Line } from 'react-chartjs-2';
import { Table, Button } from 'react-bootstrap';

const processData = (data) => {
  const years = {};
  
  data.Employees.Employee.forEach((emp) => {
    const year = emp.work_year;
    if (!years[year]) {
      years[year] = {
        totalJobs: 0,
        totalSalary: 0,
        jobTitles: {}
      };
    }
    years[year].totalJobs++;
    years[year].totalSalary += parseInt(emp.salary_in_usd, 10);
    
    const title = emp.job_title;
    if (!years[year].jobTitles[title]) {
      years[year].jobTitles[title] = 0;
    }
    years[year].jobTitles[title]++;
  });
  
  const tableData = Object.keys(years).map(year => ({
    year,
    totalJobs: years[year].totalJobs,
    avgSalary: years[year].totalSalary / years[year].totalJobs,
    jobTitles: years[year].jobTitles
  }));
  
  return tableData;
};

const MainTable = ({ data, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'year', direction: 'ascending' });
  
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  
  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort('year')}>Year</th>
          <th onClick={() => requestSort('totalJobs')}>Number of Jobs</th>
          <th onClick={() => requestSort('avgSalary')}>Average Salary (USD)</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.year} onClick={() => onRowClick(row.year, row.jobTitles)}>
            <td>{row.year}</td>
            <td>{row.totalJobs}</td>
            <td>{row.avgSalary.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const LineGraph = ({ data }) => {
  const years = data.map(row => row.year);
  const totalJobs = data.map(row => row.totalJobs);
  
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total Jobs',
        data: totalJobs,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };
  
  return <Line data={chartData} />;
};

const JobDetailTable = ({ year, jobTitles }) => (
  <div>
    <h2>Job Titles for {year}</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Number of Jobs</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(jobTitles).map((title) => (
          <tr key={title}>
            <td>{title}</td>
            <td>{jobTitles[title]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedJobTitles, setSelectedJobTitles] = useState({});

  useEffect(() => {
    const processedData = processData(data);
    setTableData(processedData);
  }, []);

  const handleRowClick = (year, jobTitles) => {
    setSelectedYear(year);
    setSelectedJobTitles(jobTitles);
  };

  return (
    <div className="App">
      <h1>Employee Data</h1>
      <MainTable data={tableData} onRowClick={handleRowClick} />
      <LineGraph data={tableData} />
      {selectedYear && <JobDetailTable year={selectedYear} jobTitles={selectedJobTitles} />}
    </div>
  );
};

export default App;
