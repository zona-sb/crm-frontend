import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  MaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_FullScreenToggleButton,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
} from '@mui/material';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import './Table.css';
import ColorFilter from './CustomFilter/ColorFilter';
import { ButtonCustom } from '../shared';

// const fetchSize = 25;

const Table = ({ data, onShown, onDelete, onEdit }) => {
  // const tableContainerRef = useRef(null);
  // const rowVirtualizerInstanceRef = useRef(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  // const [columnFilters, setColumnFilters] = useState([]);
  // const [globalFilter, setGlobalFilter] = useState();
  // const [sorting, setSorting] = useState([]);
  const columns = [
    {
      accessorKey: 'title',
      header: 'Наименование',
      size: 150,
    },
    {
      accessorKey: 'weight',
      header: 'Номер приоритета',
    },
    {
      accessorKey: 'color',
      header: 'Цвет',
      Filter: (props) => <ColorFilter data={data} {...props} />,
      Cell: ({ cell }) => (
        <Box
          sx={{
            display: 'block',
            position: 'relative',
            left: '35px',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell.getValue(),
            }}
          />
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
          {/* <span>{renderedCellValue}</span> */}
        </Box>
      ),
    },
  ];
  // const columns = [
  //   {
  //     accessorKey: 'firstName',
  //     header: 'First Name',
  //   },
  //   {
  //     accessorKey: 'lastName',
  //     header: 'Last Name',
  //   },
  //   {
  //     accessorKey: 'address',
  //     header: 'Address',
  //   },
  //   {
  //     accessorKey: 'state',
  //     header: 'State',
  //   },
  //   {
  //     accessorKey: 'phoneNumber',
  //     header: 'Phone Number',
  //   },
  // ];

  // const { data, fetchNextPage, isError, isFetching, isLoading } =
  //   useInfiniteQuery({
  //     queryKey: ['table-data', columnFilters, globalFilter, sorting],
  //     queryFn: async ({ pageParam = 0 }) => {
  //       const url = new URL(
  //         '/api/data',
  //         'https://www.material-react-table.com'
  //       );
  //       url.searchParams.set('start', `${pageParam * fetchSize}`);
  //       url.searchParams.set('size', `${fetchSize}`);
  //       url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
  //       url.searchParams.set('globalFilter', globalFilter ?? '');
  //       url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
  //       console.log(columnFilters, globalFilter, sorting);

  //       const response = await fetch(url.href);
  //       const json = await response.json();
  //       return json;
  //     },
  //     getNextPageParam: (_lastGroup, groups) => groups.length,
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   });

  // const flatData = useMemo(
  //   () => data?.pages.flatMap((page) => page.data) ?? [],
  //   [data]
  // );

  // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  // const totalFetched = flatData.length;

  // const fetchMoreOnBottomReached = useCallback(
  //   (containerRefElement) => {
  //     if (containerRefElement) {
  //       const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
  //       //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
  //       if (
  //         scrollHeight - scrollTop - clientHeight < 400 &&
  //         !isFetching &&
  //         totalFetched < totalDBRowCount
  //       ) {
  //         fetchNextPage();
  //       }
  //     }
  //   },
  //   [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  // );

  // useEffect(() => {
  //   //scroll to the top of the table when the sorting changes
  //   try {
  //     rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [sorting, columnFilters, globalFilter]);

  // useEffect(() => {
  //   fetchMoreOnBottomReached(tableContainerRef.current);
  // }, [fetchMoreOnBottomReached]);

  return (
    // <QueryClientProvider client={queryClient}>
    <MaterialReactTable
      columns={columns}
      data={data}
      positionToolbarAlertBanner='bottom'
      positionActionsColumn='last'
      enablePagination={false}
      enableStickyHeader
      enableRowActions
      enableRowSelection
      enableToolbarInternalActions={false}
      localization={MRT_Localization_RU}
      enableGlobalFilter={false}
      enableHiding={false}
      enableFullScreenToggle={false}
      enableExpanding={false}
      enableDensityToggle={false}
      enableColumnFilterModes={false}
      enableSorting={false}
      initialState={{
        showColumnFilters: true,
      }}
      // muiTableContainerProps={{
      //   sx: { maxHeight: '500px' },
      // }}
      muiTableBodyRowProps={{
        sx: (theme) => ({
          border: '1px solid rgba(224,224,224,1)',
          margin: '10px 0',
          borderRadius: '10px',
          boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.2)',
          color: theme.palette.text.primary,
          '&:after': {
            border: '1px solid rgba(224,224,224,1)',
          },
          td: {
            backgroundColor: 'transparent',
            '&:first-of-type': {
              borderRadius: '10px 0 0 10px',
            },
            '&:last-of-type': {
              borderRadius: '0 10px 10px 0',
            },
          },
          '&:hover': {
            backgroundColor: 'rgb(232 232 232)',
            td: {
              backgroundColor: 'transparent',
              '&:first-of-type': {
                borderRadius: '10px 0 0 10px',
              },
              '&:last-of-type': {
                borderRadius: '0 10px 10px 0',
              },
            },
          },
          '&.Mui-selected': {
            backgroundColor: 'rgb(229, 246, 253)',
            '&:hover': {
              backgroundColor: 'rgb(232 232 232)',
            },
          },
        }),
      }}
      muiTableHeadRowProps={{
        sx: (theme) => ({
          boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(224,224,224,1)',
          borderRadius: '10px',
          // display: 'block',
          color: theme.palette.text.primary,
        }),
      }}
      muiTopToolbarProps={{
        sx: (theme) => ({
          background: 'transparent',
        }),
      }}
      muiBottomToolbarProps={{
        sx: (theme) => ({
          background: 'transparent',
          boxShadow: 'none',
          minHeight: 'none',
        }),
      }}
      muiTableBodyCellProps={{
        sx: (theme) => ({
          background: 'transparent',
          border: '0',
          // borderRadius: '10px',
        }),
      }}
      muiTableHeadCellProps={{
        sx: (theme) => ({
          // background: 'rgba(52, 210, 235, 0.1)',
          '&:first-of-type': {
            borderRadius: '10px 0 0 10px',
          },
          '&:last-of-type': {
            borderRadius: '0 10px 10px 0',
          },
          border: '0',
          backgroundColor: 'white',
          color: theme.palette.text.primary,
        }),
      }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: {
          m: '0.5rem 0 0 0',
          width: '100%',
          '> .MuiInputBase-formControl': {
            borderRadius: '10px',
            height: '30px',
            fontSize: '14px',
          },
        },
        size: 'small',
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          table: {
            borderSpacing: '0 10px',
            padding: '0 1px',
          },
          maxWidth: '1500px',
          backgroundColor: 'transparent',

          m: 'auto',
        },
      }}
      muiToolbarAlertBannerProps={{
        sx: {
          borderRadius: '10px',
        },
      }}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color='info'
            onClick={() => {
              onEdit(row.original.id);
              // console.log(row.original);
              // table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => {
              onDelete(row.original.id);
              // console.log(row.original); //assuming simple data table
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      // muiTableContainerProps={{
      //   ref: tableContainerRef, //get access to the table container element
      //   sx: { maxHeight: '600px' }, //give the table a max height
      //   onScroll: (
      //     event //add an event listener to the table container element
      //   ) => fetchMoreOnBottomReached(event.target),
      // }}
      // muiToolbarAlertBannerProps={
      //   isError
      //     ? {
      //         color: 'error',
      //         children: 'Error loading data',
      //       }
      //     : undefined
      // }
      // onColumnFiltersChange={setColumnFilters}
      // onGlobalFilterChange={setGlobalFilter}
      // onSortingChange={setSorting}
      // state={{
      //   columnFilters,
      //   globalFilter,
      //   isLoading,
      //   showAlertBanner: isError,
      //   showProgressBars: isFetching,
      //   sorting,
      // }}
      // rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
      // rowVirtualizerProps={{ overscan: 4 }}
      renderTopToolbarCustomActions={({ table }) => {
        const handleDeactivate = () => {
          const id = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original);
          console.log(id);
        };

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <ButtonCustom
              color='confrim'
              className='custom__button-tables'
              onClick={onShown}
            >
              Добавить приоритет
            </ButtonCustom>
            <ButtonCustom
              color='reject'
              className='custom__button-tables'
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleDeactivate}
            >
              Удалить выбранные
            </ButtonCustom>
          </div>
        );
      }}
    />
    // </QueryClientProvider>
  );
};

// const queryClient = new QueryClient();

// const ExampleWithReactQueryProvider = () => (
//   <QueryClientProvider client={queryClient}>
//     <Table />
//   </QueryClientProvider>
// );

// export default ExampleWithReactQueryProvider;

export default Table;
