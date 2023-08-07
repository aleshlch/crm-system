import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Chip, Button, useTheme} from '@mui/material'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import Sidebar from '../SideBar'
import { serverPath } from '../../healpers/serverPath'
import { tokens } from "../../theme"


const TableData = () => {

	const theme = useTheme()
    const colors = tokens(theme.palette.mode)

	const [requests, setRequests] = useState([])

	const getFilter = JSON.parse(localStorage.getItem('filter')) || { product: 'All products', status: 'All status' }

	const [filterValue, setFilterValue] = useState(getFilter)
	const [filtered, setFiltered] = useState(requests)
	const [numberBadge, setNumberBadge] = useState('')

    useEffect(() => {
		fetch(serverPath + 'requests').then((res) => {
			return res.json()
		}).then((data) => {
			setRequests(data)
		}).catch((err) => {
			console.log(err.message)
		})
	}, [])
	
	useEffect(() => {
		const statusNewArr = requests.filter(item => item.status == 'New')
		setNumberBadge(statusNewArr.length)
	}, [requests])



	useEffect(() => {
		if (requests) {
			let filteredRequests = [...requests]

		if(filterValue.status !== 'All status') {
			filteredRequests = filteredRequests.filter((item) => {
				return item.status == filterValue.status
			})
		}

		if(filterValue.product !== 'All products') {
			filteredRequests = filteredRequests.filter((item) => {
				return item.product == filterValue.product
			})
		}

		setFiltered(filteredRequests)
		}
		
	}, [requests, filterValue])

	const chipColor = {
		'New': colors.redAccent[700],
		'In work': colors.blueAccent[800],
		'Completed': colors.grey[700],
	}
	


  return (
	<>
		<Sidebar numberBadge={numberBadge} filterValue={filterValue} setFilterValue={setFilterValue}/>
		<Box sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 200px)` }, mr: 0, ml: 'auto', p: 0 }}>
		    <TableContainer component={Paper} sx={{ maxHeight: `calc(100vh - 48px)`}} >
		      <Table stickyHeader sx={{ '& td': { padding: '1.2em 0.35em' }}}>
		        <TableHead>
		          <TableRow>
		            <TableCell align="center">ID</TableCell>
					<TableCell align="center">Product</TableCell>
		            <TableCell align="center">Name</TableCell>
		            <TableCell align="center">Email</TableCell>
					<TableCell align="center">Status</TableCell>
					<TableCell align="center">Action</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {requests ? filtered.map((request) => (
		            <TableRow key={request.id}>
		              <TableCell align="center">{request.id}</TableCell>
					  <TableCell align="center">{request.product}</TableCell>
		              <TableCell align="center">{request.name}</TableCell>
		              <TableCell align="center">{request.email}</TableCell>
					  <TableCell align="center"><Chip label={request.status} sx={{backgroundColor: chipColor[request.status]}}/></TableCell>
					  <TableCell align="center"><Button component={Link} to={`/edit/${request.id}`} variant="contained" endIcon={<EditIcon />}>Edit</Button></TableCell>
		            </TableRow>
		          )) : ''}
		        </TableBody>
		      </Table>
		    </TableContainer>
		</Box>
	</>
  );
};

export default TableData;