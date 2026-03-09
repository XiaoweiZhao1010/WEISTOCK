"use client";
import { useGetUsersQuery, User } from "@/state/api";
import Header from "../(components)/Header/index";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
const Page = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const rows: User[] = users ?? [];

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "ID",
      width: 300,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
  ];
  if (isError || !rows) {
    return (
      <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold text-red-500">
        Failed to fetch users...
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold">
          Loading...
        </div>
      ) : (
        <div>
          <Header title="Users" />
          <Box sx={{ height: 750, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.userId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 12,
                  },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              className="bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700"
            />
          </Box>
        </div>
      )}
    </>
  );
};

export default Page;
