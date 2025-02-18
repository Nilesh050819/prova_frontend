import React, { useEffect, useState, useRef } from 'react';
import axios from '../../api/axios';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
//import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 70
  },
  {
    field: 'userId', headerName: 'User ID', width: 70
  },
  {
    field: 'title', headerName: 'Title', width: 200
  },
  {
    field: 'body', headerName: 'Body', flex: 1
  },
]

function Sample() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log('ON')
      setPageState(old => ({ ...old, isLoading: true }))
      const response = await fetch(`http://localhost:8080/sample?page=${pageState.page}&limit=${pageState.pageSize}`)
      const json = await response.json()
      setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize])

  const gridRef = React.useRef();

  const gridOptions = {
      rowModelType: 'serverSide', // Enable server-side row model
    
  };

  const onGridReady = (params) => {
    const datasource = {
        getRows: (params) => {
            // Server-side data fetching logic
            const { startRow, endRow, filterModel, sortModel } = params.request;

            fetch('http://localhost:4000/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startRow, endRow, filterModel, sortModel }),
            })
                .then((response) => response.json())
                .then((data) => {
                    params.successCallback(data.rows, data.lastRow);
                })
                .catch((error) => {
                    console.error('Error loading data:', error);
                    params.failCallback();
                });
        },
    };

    // Set the datasource to enable server-side row model
    params.api.setServerSideDatasource(datasource);
};

  const columnDefs = [
      { field: 'id', sortable: true, filter: true },
      { field: 'name', sortable: true, filter: true },
      { field: 'age', sortable: true, filter: true },
      { field: 'country', sortable: true, filter: true },
  ];

  return <Box>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Server-side Pagination demo
        </Typography>
      </Toolbar>
    </AppBar>
    <Container style={{ marginTop: 100, marginBottom: 100 }}>
      <DataGrid
        autoHeight
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
        columns={columns}
      />
    </Container>
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                columnDefs={columnDefs}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
            />
        </div>
  </Box>
  
}

export default Sample;
