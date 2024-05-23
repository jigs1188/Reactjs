// import './App.css';
// import React   from 'react';
// import Greet  from './component/Greet';
// import Welcome from './component/Welcome';
// import Hellojsx from './component/Hello';
// import Message from './component/Message';
// import Counter from './component/Counter';
// import FunctionClick from './component/FunctionClick';
// import ClassClick from './component/ClassClick';

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <h1>hi</h1>
//         <hr />
//         <Hellojsx/>
//         <hr />
//         <Greet name="anu"/>
//         <Greet name="malik"/>
//         <Greet name="sahab"/>
//         <hr />
//         <Welcome/>
//         <Welcome></Welcome>
//         <Welcome name='Hritik' heroName="batman"/>
//         <button>Action</button>
//         <Welcome name='SRK' heroName="Ra.one"/>
//         <hr />
//         <Message/>
//         <hr />
//         <Counter/>
//         <hr />
//         <FunctionClick/>
//         <hr />
//         <ClassClick/>

//       </div>
//     );
//   }
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Make sure to import your CSS
import data from './Table.json';
import LineGraph from './Chart';

const processData = (data) => {
  const years = {};
  data.Employees.Employee.forEach((emp) => {
    const year = emp.work_year;
    if (!years[year]) {
      years[year] = {
        totalJobs: 0,
        totalSalary: 0,
        jobTitles: {},
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

  const tableData = Object.keys(years).map((year) => ({
    year,
    totalJobs: years[year].totalJobs,
    avgSalary: years[year].totalSalary / years[year].totalJobs,
    jobTitles: years[year].jobTitles,
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Table striped bordered hover size="sm" className="table">
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

const JobDetailTable = ({ year, jobTitles }) => (
  <div>
    <h5 className="table-title">Job Titles for {year}</h5>
    <Table striped bordered hover size="sm" className="table">
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
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Navbar.Brand href="#home">Employee Data</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="container">
        <Row className="my-4">
          <Col md={8}>
            <h3>Main Table</h3>
            <MainTable data={tableData} onRowClick={handleRowClick} />
          </Col>
          <Col md={4} className="line-chart">
            <h3>Line Graph</h3>
            <LineGraph data={tableData} />
          </Col>
        </Row>
        {selectedYear && (
          <Row className="my-4">
            <Col>
              <JobDetailTable year={selectedYear} jobTitles={selectedJobTitles} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default App;

