import { Grid, TextField, Typography, MenuItem, Container, Paper, Button, useTheme } from '@mui/material'  
import DeleteIcon from '@mui/icons-material/Delete'  
import SendIcon from '@mui/icons-material/Send'  
import { product, status } from '../../data'
import { serverPath } from '../../healpers/serverPath'  
import { useNavigate, useParams } from 'react-router-dom'  
import { useState, useEffect } from 'react'  
import { tokens } from "../../theme"

const Edit = () => {

    const theme = useTheme()  
    const colors = tokens(theme.palette.mode)  
    
    const { id } = useParams()

    const [editableItem, setEditableItem] = useState(null)

    useEffect(() => {
		fetch(serverPath + 'requests/' + id).then((res) => {
			return res.json()
		}).then((data) => {
			setEditableItem(data)
		}).catch((err) => {
			console.log(err.message)
		})
	}, [])

    const nav = useNavigate()


    const onChangeData = (e) => {
        setEditableItem((item) => {
            const newRequest = {...item}
            newRequest[e.target.name] = e.target.value
            return newRequest
        })
    }

    const deleteRequest = () => {
		fetch(serverPath + 'requests/' + id, {
			method: 'DELETE'
		}).then((res) => {
            if(res.ok) {
                nav('/table')
            }
        })
	}


	const dataEdit = (e) => {
		e.preventDefault()
		fetch(serverPath + 'requests/' + id, {
			method: 'PUT',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(editableItem)
		}).then((res) => {
            if(res.ok) {
                nav('/table')
            }
        })

	}

    if (editableItem) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 48px)' }}>
            <Container maxWidth="md">
                <Paper component="form" elevation={5} sx={{ p: 3, backgroundColor: colors.primary[500] }} onSubmit={(e)=>{dataEdit(e)}}>
                    <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={1} marginBottom={3}>
                        <Grid item xs={3}>
                            <Typography variant="h6">ID:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6">request №{editableItem.id}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6">Date:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6">{editableItem.date} {editableItem.time}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Product:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                select
                                name='product'
                                value={editableItem.product}
                                fullWidth
                                onChange={(e) => {onChangeData(e)}}
                                >
                                {product.map((option) => (
                                    <MenuItem key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Name:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                required
                                name='name'
                                fullWidth
                                variant="outlined"
                                value={editableItem.name}
                                onChange={(e) => {onChangeData(e)}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Email:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                required
                                name='email'
                                fullWidth
                                variant="outlined"
                                value={editableItem.email}
                                onChange={(e) => {onChangeData(e)}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">Status:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                select
                                name='status'
                                value={editableItem.status}
                                fullWidth
                                onChange={(e) => {onChangeData(e)}}
                                >
                                {status.map((option) => (
                                    <MenuItem key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button
                        type="remove"
                        variant="contained"
                        size="large"
                        startIcon={<DeleteIcon />}
                        onClick={deleteRequest}
                        color="secondary"
                        >Delete</Button>
                        <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                        >Save</Button>
                    </div>
                </Paper>
            </Container>
        </div>
    )
    }
}
 
export default Edit  